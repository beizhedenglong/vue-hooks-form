import {
  reactive, computed, ref, Ref, watch,
} from 'vue'
import { RuleItem } from 'async-validator'
import DeepValidator from './deepValidator'
import {
  isAllUnmounted, get, set, toPathString,
  getDOMNode, FieldNode,
} from './utils'

export type ValidateMode = 'change' | 'focusout' | 'submit'

export type FormOptions<Values extends object> = {
  defaultValues?: Values;
  shouldUnregister?: boolean;
  validateMode?: ValidateMode;
}

export type FieldOptions = {
  rule?: RuleItem;
}
export type Error = {
  message: string;
  field: string;
}

export type Errors = {
  [field: string]: Error[] | undefined;
}

export const useForm = <T extends object>(options: FormOptions<T> = {}) => {
  const {
    defaultValues = {} as T,
    shouldUnregister = true,
    validateMode = 'change',
  } = options
  const validator = DeepValidator({})
  const fieldsRef = ref<{ [key: string]: Set<Ref<FieldNode>> }>({})
  const fieldValues = reactive(defaultValues) as any

  const errors = reactive({} as Errors)

  // make errors is reactive
  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  }
  const setErrors = (newErrors: Errors) => {
    clearErrors()
    Object.keys(newErrors).forEach((key) => {
      errors[key] = newErrors[key]
    })
  }

  const getFieldValues = () => Object.keys(fieldsRef.value).reduce((acc, path) => {
    // only return fields that exit on page
    const value = get(fieldValues, path)
    if (!shouldUnregister) {
      set(acc, path, value)
      return acc
    }
    if (!isAllUnmounted(fieldsRef.value[path])) {
      set(acc, path, value)
      return acc
    }
    return acc
  }, {} as Partial<T>)
  const validateFields = async () => {
    try {
      const noErrors = await validator.validate(getFieldValues())
      clearErrors()
      return noErrors
    } catch (error) {
      setErrors(error)
      return error
    }
  }

  const validateField = async (path: any) => {
    try {
      const noError = await validator.validateField(path, get(fieldValues, path))
      delete errors[path]
      return noError
    } catch (error) {
      errors[path] = error
      return error
    }
  }
  const useField = (path: string | (string | number)[], options: FieldOptions = {}) => {
    const pathStr = toPathString(path)
    const fieldRef = ref<FieldNode>(null)
    const { rule } = options
    const validateWithoutError = async () => {
      await validateField(pathStr)
    }
    if (rule) {
      validator.registerRule(pathStr, rule)
    }
    const value = computed({
      get: () => get(fieldValues, pathStr),
      set: (newValue) => {
        set(fieldValues, pathStr, newValue)
      },
    })
    const listener = ref((e: Event) => {
      validateWithoutError()
    })
    const getRef = (nodeRef: FieldNode) => {
      const domNode = getDOMNode(nodeRef)
      if (domNode !== null) {
        if (validateMode === 'focusout') {
          domNode.addEventListener('focusout', listener.value)
        }
      } else {
        const prevDomNode = getDOMNode(fieldRef.value)
        if (prevDomNode !== null) {
          if (validateMode === 'focusout') {
            prevDomNode.removeEventListener('focusout', listener.value)
          }
        }
      }
      fieldRef.value = nodeRef
      const nodeSet = fieldsRef.value[pathStr] || new Set()
      nodeSet.add(fieldRef)
      fieldsRef.value[pathStr] = nodeSet
      if (shouldUnregister && isAllUnmounted(nodeSet)) {
        validator.removeRule(pathStr)
      }
    }
    watch(value, async () => {
      if (validateMode === 'change') {
        validateWithoutError()
      }
    })
    // can't watch the change of fieldRef
    // watch(fieldRef, () => {
    //   console.log('watch', fieldRef)
    // })
    return reactive({
      ref: getRef,
      value,
      error: computed(() => errors[pathStr]),
      validate: () => validateField(pathStr),
    })
  }
  const handleSubmit = (onSubmit: (fieldValues: Partial<T>) => any) => async (e: Event) => {
    if (e) {
      e.preventDefault()
    }

    const error = await validateFields()
    if (!error) {
      onSubmit(getFieldValues())
    }
  }
  return reactive({
    values: fieldValues as T,
    useField,
    get: (path: string, defaultValue?: any) => get(fieldValues, path, defaultValue),
    set: (path: string, value: any) => set(fieldValues, path, value),
    getFieldValues,
    validateFields,
    validateField,
    errors,
    handleSubmit,
  })
}
