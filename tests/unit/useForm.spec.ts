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
})
