# Vue Hooks Form
Building forms with Vue composition API.
>The API is not stable and might change in the future.

## Docs
Visit https://beizhedenglong.github.io/vue-hooks-form/.

## Installation

```
  yarn add vue-hooks-form
```
## Features
- UI decoupling: Since It does not contain any UI code, It can be easily integrated with other UI libraries.
- Easy to adoptable: Since form state is inherently local and ephemeral, it can be easily adopted.
- Easy to use: No fancy stuffs, just reactive values/errors.
- TypeScript support.
  
## Quickstart
```vue
<template>
  <form @submit="onSubmit">
    <label>Username</label>
    <input v-model="username.value" :ref="username.ref" />
    <p v-if="username.error">{{ username.error.message }}</p>
    <label>Password</label>
    <input v-model="password.value" :ref="password.ref" type="password" />
    <p v-if="password.error">{{ password.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from 'vue-hooks-form'

export default {
  setup() {
    const { useField, handleSubmit } = useForm({
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
    const onSubmit = (data) => console.log(data)
    return {
      username,
      password,
      onSubmit: handleSubmit(onSubmit),
    }
  },
}
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
  handleSubmit
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
 error,
 validate
} = useField(path, options)
```


## Credits
This project was inspired by [react-hook-form](https://react-hook-form.com/), [formik](https://formik.org), and many other form libraries.