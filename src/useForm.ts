import { reactive, computed, ref } from 'vue'

export type FormConfig<Values extends object> = {
  initialValues?: Values;
}

export const useForm = <T extends object>({
  initialValues = {} as T,
}: FormConfig<T>) => {
  const fieldValues = reactive(initialValues) as any
  const register = (path: string) => {
    const fieldRef = ref<HTMLElement>()
    const value = computed({
      get: () => fieldValues[path],
      set: (newValue) => {
        fieldValues[path] = newValue
      },
    })
    return reactive({
      ref: (nodeRef: HTMLElement) => { fieldRef.value = nodeRef },
      value,
    })
  }
  const setValue = (path: string, value: any) => {
    fieldValues[path] = value
  }

  return reactive({
    values: fieldValues as T,
    register,
    setValue,
  })
}
