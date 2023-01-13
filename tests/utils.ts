/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue-demi'

export type RenderHookResult<T> = {
  result?: T;
}
export const renderHook = <Result>(
  callback: () => Result | void = () => { },
): RenderHookResult<Result> => {
  let result
  const Container = defineComponent({
    setup() {
      result = callback()
      return result
    },
    render() {
      return null
    },
  })
  mount(Container)

  return {
    result,
  }
}

export const waitForNextUpdate = (timeout?: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(undefined)
  }, timeout)
})
