import type { Field } from '@/types/fields'
import getFieldValueAs from './getFieldValueAs'
import { isUndefined } from 'lodash-es'

export default function getFieldValue(field?: Field) {
  if (field && field._f) {
    const ref = field._f.ref

    if (ref.disabled) {
      return
    }

    return getFieldValueAs(isUndefined(ref.value) ? field._f.ref.value : ref.value)
  }
}
