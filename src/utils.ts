import { Ref, ComponentPublicInstance } from 'vue'
import { toPath as _toPath } from 'lodash-es'
export { get, set, merge, setWith } from 'lodash-es'
// export { default as merge } from 'lodash.merge'
// export { default as setWith } from 'lodash.setwith'

export const isUnmounted = (fieldRef: Ref) => fieldRef.value === null

export const isAllUnmounted = (fieldRefs?: Set<Ref>) => {
  if (fieldRefs === undefined) {
    return true
  }
  return [...fieldRefs].every(isUnmounted)
}

export const toPath = _toPath

export const toPathString = (path: any) => toPath(path).join('.')

// export const set = _set

// export const get = _get

export type FieldNode = HTMLElement | null | ComponentPublicInstance
export const getDOMNode = (value: FieldNode) => {
  if (value === null || value instanceof HTMLElement) {
    return value
  }
  return value.$el as HTMLElement
}
