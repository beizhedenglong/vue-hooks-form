import getFieldValue from '@/logic/getFieldValue'
import type { Field, FieldRefs } from '@/types/fields'
import type { ChangeHandler, Names } from '@/types/form'
import { get, set } from '@/utils'
import { reactive } from 'vue'
import { isUndefined } from 'lodash-es'
import { EVENTS } from '@/constants'

export const useRegisterForm = () => {
  const fieldsRef = reactive<FieldRefs>({})
  const namesRef = reactive<Names>({
    mount: new Set(),
    unMount: new Set(),
  })

  const handleChange: ChangeHandler = async ({ type, target, target: { name, value, type: inputType } }: any) => {
    const field = get(fieldsRef, name)
    if (field) {
      let inputValue = inputType ? getFieldValue(field) : undefined
      inputValue = isUndefined(inputValue) ? value : inputValue

      if (!isUndefined(inputValue)) {
        field._f.value = inputValue
      } // const isBlurEvent = type === EVENTS.BLUR
    }
  }

  const register = (name: string) => {
    const field = get(fieldsRef, name)
    set(fieldsRef, name, {
      _f: {
        ...(field && field._f ? field._f : { ref: { name } }),
        name,
        mount: true,
        // ref: (ref: HTMLInputElement | null): void => {
        //   console.log(ref)
        //   return void
        // },
      },
    })
    namesRef.mount.add(name)
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
