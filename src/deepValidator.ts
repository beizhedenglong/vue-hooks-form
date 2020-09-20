import Validator, { RuleItem, Rules, ValidateSource } from 'async-validator'
import { toPath, setWith } from './utils'

const DeepValidator = (rules: Rules = {}) => {
  const registerRule = (path: any, rule: RuleItem) => {
    const rulePath = toPath(path).join('.fields.')
    setWith(rules, rulePath, rule, (pathValue, key) => {
      if (key !== 'fields') {
        return pathValue || ({ type: 'object' } as RuleItem)
      }
      return pathValue
    })
  }

  return {
    getRules: () => rules,
    registerRule,
    validate: (data: ValidateSource) => new Validator(rules).validate(data),
  }
}

export default DeepValidator
