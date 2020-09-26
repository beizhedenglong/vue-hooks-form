import {
  reactive, computed, ref, Ref,
} from 'vue'
import { RuleItem } from 'async-validator'
import DeepValidator from './DeepValidator'
import {
  isAllUnmounted, get, set, toPathString,
} from './utils'

export type FormOptions<Values extends object> = {
  defaultValues?: Values;
  shouldUnregister?: boolean;
}

export type FieldOptions = {
  rule?: RuleItem;
}
export type Error = {
  message: string;
  field: string;
}

export type ErrorFields = {
  [field: string]: Error[] | undefined;
}

export const useForm = <T extends object>({
  defaultValues = {} as T,
  shouldUnregister = true,
}: FormOptions<T>) => {
  const validator = DeepValidator({})
  const fieldsRef = ref<{ [key: string]: Set<Ref<HTMLElement | null>> }>({})
  const fieldValues = reactive(defaultValues) as any

  const errorFields = reactive({} as ErrorFields)

  // make errorFields is reactive
  const clearErrorFields = () => {
    Object.keys(errorFields).forEach((key) => {
      delete errorFields[key]
    })
  }
  const setErrorFields = (errors: ErrorFields) => {
    Object.keys(errors).forEach((key) => {
      errorFields[key] = errors[key]
    })
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
    return reactive({
      ref: getRef,
      value,
      errors: computed(() => errorFields[pathStr]),
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
      clearErrorFields()
    } catch (error) {
      setErrorFields(error)
      throw error
    }
  }

  const validateField = async (path: any) => {
    try {
      await validator.validateField(path, get(fieldValues, path))
      delete errorFields[path]
    } catch (error) {
      errorFields[path] = error
      throw error
    }
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
    errorFields,
  })
}
