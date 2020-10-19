import {
  reactive, computed, ref, Ref, watch,
} from 'vue'
import { RuleItem } from 'async-validator'
import DeepValidator from './deepValidator'
import {
  isAllUnmounted, get, set, toPathString,
} from './utils'

export type ValidateMode = 'change'

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

export const useForm = <T extends object>({
  defaultValues = {} as T,
  shouldUnregister = true,
  validateMode = 'change',
}: FormOptions<T>) => {
  const validator = DeepValidator({})
  const fieldsRef = ref<{ [key: string]: Set<Ref<HTMLElement | null>> }>({})
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
  }, {})
  const validateFields = async () => {
    try {
      await validator.validate(getFieldValues())
      clearErrors()
    } catch (error) {
      setErrors(error)
      throw error
    }
  }

  const validateField = async (path: any) => {
    try {
      await validator.validateField(path, get(fieldValues, path))
      delete errors[path]
    } catch (error) {
      errors[path] = error
      throw error
    }
  }
  const useField = (path: string | (string | number)[], options: FieldOptions = {}) => {
    const pathStr = toPathString(path)
    const fieldRef = ref<HTMLElement | null>(null)
    const { rule } = options
    if (rule) {
      validator.registerRule(pathStr, rule)
    }
    const value = computed({
      get: () => get(fieldValues, pathStr),
      set: (newValue) => {
        set(fieldValues, pathStr, newValue)
      },
    })
    const getRef = (nodeRef: HTMLElement) => {
      fieldRef.value = nodeRef
      const nodeSet = fieldsRef.value[pathStr] || new Set()
      nodeSet.add(fieldRef)
      fieldsRef.value[pathStr] = nodeSet
    }
    watch(value, async () => {
      if (validateMode === 'change') {
        // ignore validate error
        try {
          await validateField(path)
        } catch (error) {
          //
        }
      }
    })
    return reactive({
      ref: getRef,
      value,
      error: computed(() => errors[pathStr]),
    })
  }
  return reactive({
    values: fieldValues as T,
    useField,
    get: (path: string, defaultValue: any) => {
      get(fieldValues, path, defaultValue)
    },
    set: (path: string, value: any) => {
      set(fieldValues, path, value)
    },
    getFieldValues,
    validateFields,
    validateField,
    errors,
  })
}
