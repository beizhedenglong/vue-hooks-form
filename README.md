# Vue Hooks Form
Building forms with Vue composition API: https://beizhedenglong.github.io/vue-hooks-form/.
>The API is not stable and might change in the future.

## Installation

```
  yarn add vue-hooks-form
```
## Features
- UI decoupling: Since It does not contain any UI code, It can be easily integrated with other UI libraries.
- Easy to adoptable: Since form state is inherently local and ephemeral, it can be easily adopted.
- Easy to use.
- TypeScript support.
  
## Usage
```vue
<template>
  <form @submit="onSubmit">
    <input v-model="username.value" :ref="username.ref" />
    {{username.error && username.error.message}}
    <input v-model="password.value" :ref="password.ref" type="password" />
    {{password.error && password.error.message}}
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from 'vue-hooks-form'

export default defineComponent({
  setup() {
    const { useField, validateFields, getFieldValues } = useForm({
      defaultValues: {},
    })
    const username = useField('username', {
      rule: { required: true },
    })
    const password = useField('password', {
      rule: {
        required: true,
        min: 6,
        max: 10,
      },
    })
    return {
      username,
      password,
      async onSubmit(e: Event) {
        e.preventDefault()
        try {
          await validateFields()
          console.log(getFieldValues())
        } catch (error) {
          console.log(error)
        }
      },
    }
  },
})
</script>
```
## Live Demo
[![Edit Vue Hooks Form Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-hooks-form-demo-lqtp0?fontsize=14&hidenavigation=1&theme=dark)


## API(TODO)

### `useForm`
```js
const {
  values,
  getFieldValues,
  errors,
  validateFields,
  validateField,
  get,
  set,
  useField,
} = useForm({
  defaultValues: {},
  shouldUnregister: true,
  validateMode: 'change',
})
```

### `useField`
```js
const {
 ref,
 value,
 error
} = useField(path, options)
```
