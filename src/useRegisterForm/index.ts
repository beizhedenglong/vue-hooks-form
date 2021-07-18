import type { FieldRefs } from '@/types/fields'
import { get, set } from '@/utils'
import { reactive } from 'vue'

export const useRegisterForm = () => {
  const fieldsRef = reactive<FieldRefs>({})

  const handleChange = ({ target: { name, value } }: any) => {
    set(fieldsRef, name, value)

    // console.log('handleChange', fieldsRef)
  }

  const register = (name: string) => {
    const field = get(fieldsRef, name)
    !field && set(fieldsRef, name, '')
    // console.log('register', fieldsRef)
    return {
      name,
      onChange: handleChange,
    }
  }

  return {
    register,
  }
}
