# Validation
Vue Hooks From makes form validation easy. It supports synchronous and asynchronous form-level and field-level validation.

List of validation rules supported:
- Type: string/number/boolean/method/regexp/array/...
- Required
- Pattern
- Range
- Length
- Enumerable
- Validator/Async Validator
- Messages
- ...

Vue Hooks Form use `async-validator` to do validation, click [here](https://github.com/yiminghe/async-validator) for more information。

## Synchronous validation

<demo path="sync-validation" />

## Asynchronous validation

<demo path="async-validation.vue"/>

## Validation mode
You can control when forms runs validation by change the value of `validateMode: 'change' | 'focusout' | 'submit' = 'change'`.

<demo path="validation-mode.vue"/>

## Manually triggering validation
You can manually trigger form-level validation by using `validateFields()` and field-level validation by using `validateField(path)`/`useField(path).validate()`.

<demo path="manually-validation.vue"/>

