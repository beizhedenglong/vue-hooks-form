import Validator, { RuleItem, Rules, ValidateSource } from 'async-validator'
import {
  toPath, setWith, get, set,
} from './utils'

const getRulePath = (path: any) => toPath(path).join('.fields.')

const getRule = (rules: Rules, path: any) => {
  const rulePath = getRulePath(path)
  return get(rules, rulePath) as RuleItem
}

const setRule = (rules: Rules, path: any, rule: RuleItem) => {
  const rulePath = getRulePath(path)
  return setWith(rules, rulePath, rule, (pathValue, key) => {
    if (key !== 'fields') {
      return pathValue || ({ type: 'object' } as RuleItem)
    }
    return pathValue
  })
}
const DeepValidator = (rules: Rules = {}) => {
  const registerRule = (path: any, rule: RuleItem) => {
    setRule(rules, path, rule)
  }
  const validate = async (data: ValidateSource) => {
    try {
      return await new Validator(rules).validate(data)
    } catch ({ errors, fields }) {
      throw fields
    }
  }
  return {
    getRules: () => rules,
    registerRule,
    validate,
    validateField: async (path: any, value: any) => {
      const fieldRule = setRule({}, path, getRule(rules, path))
      try {
        return await new Validator(fieldRule).validate(
          set({}, path, value),
        )
      } catch ({ fields }) {
        throw fields[path]
      }
    },
  }
}

export default DeepValidator
