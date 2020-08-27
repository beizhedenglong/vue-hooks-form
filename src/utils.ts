import { Ref } from 'vue'

export const isUnmounted = (fieldRef: Ref) => fieldRef.value === null

export const isAllUnmounted = (fieldRefs?: Set<Ref>) => {
  if (fieldRefs === undefined) {
    return true
  }
  return [...fieldRefs].every(isUnmounted)
}
