import type { RuleItem } from 'async-validator'

export type ValidateMode = 'change' | 'focusout' | 'submit'

export type FormOptions<Values extends object> = {
  defaultValues?: Values
  shouldUnregister?: boolean
  validateMode?: ValidateMode
}

export type FieldOptions = {
  rule?: RuleItem
}
export type Error = {
  message: string
  field: string
}

export type Errors = {
  [field: string]: Error[] | undefined
}
