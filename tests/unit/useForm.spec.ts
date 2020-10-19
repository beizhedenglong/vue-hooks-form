import { shallowMount } from '@vue/test-utils'
// @ts-ignore
import Example from './Example.vue'

describe('useFrom', () => {
  it('renders props.msg when passed', async () => {
    const defaultValues = {
      name: 'wang',
      age: 1,
      info: {
        email: 'hello@example.com',
        city: 'beijing',
      },
      notInclude: 'notInclude',
    }
    const wrapper = shallowMount(Example, {
      props: {
        defaultValues,
      },
    })
    const instance = wrapper.vm as any
    const input = wrapper.find('#name')
    const button = wrapper.find('button')
    expect(instance.values).toEqual(defaultValues)
    expect(instance.getFieldValues()).toEqual(
      {
        name: 'wang',
        age: 1,
        info: {
          email: 'hello@example.com',
        },
      },
    )
    expect(instance.getFieldValues().info.city).toBe(undefined)
    expect(wrapper).toMatchSnapshot()
    await input.setValue('Victor')
    expect(instance.values.name).toEqual('Victor')
    try {
      instance.validateFields()
    } catch (errors) {
      expect(errors.age).toBeDefined()
    }
  })
})
