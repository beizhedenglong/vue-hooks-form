# Vue Hooks Form
Build forms with Vue composition API: https://beizhedenglong.github.io/vue-hooks-form/.
>The API is not stable and might change in the future.

## Installation

```
  yarn add vue-hooks-form
```
## Usage
```vue
<template>
  <Input
    label="Username"
    icon="fa-user"
    v-model="username.value"
    :ref="username.ref"
    :is-danger="!!username.error"
    :error-message="username.error && username.error.message"
  />
  <Input
    label="Password"
    type="password"
    icon="fa-key"
    v-model="password.value"
    :ref="password.ref"
    :is-danger="!!password.error"
    :error-message="password.error && password.error.message"
  />
  <Input
    label="Confirm Password"
    type="password"
    icon="fa-key"
    v-model="confirmedPassword.value"
    :ref="confirmedPassword.ref"
    :is-danger="!!confirmedPassword.error"
    :error-message="confirmedPassword.error && confirmedPassword.error.message"
  />
  <button class="button is-link" @click="onSubmit">Submit</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from './Input.vue'
import { useForm } from '../../src'

export default defineComponent({
  name: 'Demo',
  components: {
    Input,
  },
  setup() {
    const {
      useField,
      validateFields,
      getFieldValues,
      values,
    } = useForm({
      defaultValues: {
        username: 'Victor',
      },
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
    const confirmedPassword = useField('confirmedPassword', {
      rule: {
        required: true,
        validator(rule, value) {
          if (!value || value !== (values as any).password) {
            return new Error(
              'The two passwords that you entered do not match!',
            )
          }
          return true
        },
      },
    })
    return {
      username,
      password,
      confirmedPassword,
      async onSubmit() {
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


## API
