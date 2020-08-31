import { Ref } from 'vue'
import _toPath from 'lodash.topath'
import _get from 'lodash.get'
import _set from 'lodash.set'

export const isUnmounted = (fieldRef: Ref) => fieldRef.value === null

export const isAllUnmounted = (fieldRefs?: Set<Ref>) => {
  if (fieldRefs === undefined) {
    return true
  }
  return [...fieldRefs].every(isUnmounted)
}

export const toPath = _toPath

export const toPathString = (path: any) => toPath(path).join('.')

export const get = _get

export const set = _set
