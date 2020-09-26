import { RuleItem, Rules } from 'async-validator'
import DeepValidator from '../../src/DeepValidator'

describe('DeepValidator', () => {
  const rules: Rules = {
    name: {
      type: 'string',
      required: true,
      validator: (rule: RuleItem, value: string) => value === 'muji',
    },
    age: {
      type: 'number',
      asyncValidator: (rule: RuleItem, value: number) => new Promise((resolve, reject) => {
        if (value < 18) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('too young') // reject with error message
        } else {
          resolve()
        }
      }),
    },
  }
  const validator = DeepValidator(rules)
  test('registerRule', async (done) => {
    validator.registerRule('email', {
      type: 'email',
    })

    validator.validateField('email', { email: 'xxx' }).catch(({ errors, fields }) => {
      console.log(errors, fields)
      expect(fields.email).toBeDefined()
      expect(fields.name).toBeUndefined()
      done()
    })
  })
  test('register deep rule', async (done) => {
    const friendsValidator = (rule: RuleItem, value: any, cb: any) => {
      if (value.length < 1) {
        cb('must have a friend')
      }
    }
    validator.registerRule('person.friends', {
      type: 'array',
      validator: friendsValidator,
    })
    expect(validator.getRules().person).toEqual({
      type: 'object',
      fields: {
        friends: {
          type: 'array',
          validator: friendsValidator,
        },
      },
    } as RuleItem)
    validator.validate({
      person: {
        friends: [],
      },
    }).catch(({ fields }) => {
      expect(fields['person.friends']).toBeDefined()
      done()
    })
  })
})
