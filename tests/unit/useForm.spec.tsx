import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { renderHook, waitForNextUpdate } from '../utils'
import { useForm } from '../../src'

describe('useFrom', () => {
  test('basic', async (done) => {
    const defaultValues = {
      name: 'wang',
      age: 1,
      info: {
        email: 'hello@example.com',
        city: 'beijing',
      },
      notInclude: 'notInclude',
    }
    const { result } = renderHook(() => useForm({
      defaultValues,
    }))
    if (result !== undefined) {
      const nameField = result.useField('name', {
        rule: { required: true },
      })
      expect(result.values).toEqual(defaultValues)
      expect(result.errors).toEqual({})
      expect(nameField.value).toBe('wang')
      nameField.value = 'victor'
      expect(nameField.value).toBe('victor')
      await nameField.validate()
      expect(result.errors.name).toBe(undefined)
      nameField.value = undefined
      await waitForNextUpdate()
      expect(nameField.error).toBeDefined()
      expect(result.errors.name).toBeDefined()
      done()
    } else {
      throw Error
    }
  })
  test('nested', async (done) => {
    const { result } = renderHook(() => useForm())
    if (result !== undefined) {
      expect(result.values).toEqual({})
      const nestedField = result.useField('a.b.c.d', {
        rule: { required: true },
      })
      expect(nestedField.value).toBeUndefined()
      expect(nestedField.error).toBeUndefined()
      nestedField.value = 1
      expect(result.get('a.b.c.d')).toBe(1)
      await waitForNextUpdate()
      expect(nestedField.error).toBeDefined()
    } else {
      throw Error
    }
    done()
  })
  test('with component', async (done) => {
    const mockFn = jest.fn()
    const Form = defineComponent({
      setup() {
        const {
          useField, handleSubmit, values, errors, set,
        } = useForm({
          defaultValues: {},
        })
        const nameField = useField('name', {
          rule: { required: true },
        })
        return {
          values,
          nameField,
          onSubmit: handleSubmit(mockFn),
          errors,
          set,
        }
      },
      render() {
        return <form action="" >
          <input type="text" ref={this.nameField.ref as any} value={this.nameField.value} onInput={(e: any) => { this.nameField.value = e.target.value }}/>
        </form>
      },
    })
    const wrapper = mount(Form)
    expect(wrapper.vm.values).toEqual({})
    const nameInput = wrapper.find('input')
    await wrapper.vm.onSubmit()
    expect(mockFn).toBeCalledTimes(0)
    expect(wrapper.vm.errors.name).toBeDefined()
    await nameInput.setValue('victor')
    expect(wrapper.vm.values).toEqual({ name: 'victor' })
    await wrapper.vm.onSubmit()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith({ name: 'victor' })
    expect(wrapper.vm.errors.name).toBeUndefined()
    wrapper.vm.set('name', 'wang')
    expect(wrapper.vm.values).toEqual({ name: 'wang' })
    await waitForNextUpdate()
    expect(nameInput.element.value).toBe('wang')
    done()
  })
})
