import {
  reactive, computed, ref, Ref,
} from 'vue'
import {
  isAllUnmounted, get, set, toPathString,
} from './utils'

export type FormConfig<Values extends object> = {
  initialValues?: Values;
  shouldUnregister?: boolean;
}

export const useForm = <T extends object>({
  initialValues = {} as T,
  shouldUnregister = true,
}: FormConfig<T>) => {
  const fieldsRef = ref<{ [key: string]: Set<Ref<HTMLElement | null>> }>({})
  const fieldValues = reactive(initialValues) as any
  const register = (path: string | (string | number)[]) => {
    const pathStr = toPathString(path)
    const fieldRef = ref<HTMLElement | null>(null)
    const value = computed({
      get: () => get(fieldValues, pathStr),
      set: (newValue) => {
        console.log(newValue)
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
    })
  }

  const setValue = (path: string, value: any) => {
    set(fieldValues, path, value)
  }

  return reactive({
    values: fieldValues as T,
    register,
    setValue,
    fieldsRef,
    getFieldValues: () => Object.keys(fieldValues).reduce((acc, key) => {
      // 注意这里原始数据的增删
      // 1. 只保留表单里的数据还是咋样
      if (isAllUnmounted(fieldsRef.value[key]) && shouldUnregister) {
        return acc
      }
      if (fieldsRef.value[key] === undefined) {
        return acc
      }
      acc[key] = fieldValues[key]
      return acc
    }, {} as any),
  })
}
