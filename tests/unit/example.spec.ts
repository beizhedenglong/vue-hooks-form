import { shallowMount } from '@vue/test-utils'
// @ts-ignore
import HelloWorld from '../../example/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
