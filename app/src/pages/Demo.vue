<template>
  <form @submit="onSubmit">
    {{ errors }}
    <label>Username</label>
    <input :ref="username.ref" v-model="username.value" />
    <p v-if="username.error">
      {{ username.error.message }}
    </p>
    <button type="button" @click="() => validateField('username')"> Check Username </button>
    <label>Password</label>
    <input :ref="password.ref" v-model="password.value" type="password" />
    <p v-if="password.error">
      {{ password.error.message }}
    </p>
    <button type="button" @click="() => password.validate()"> Check Password </button>
    <button type="submit"> submit </button>
  </form>
</template>

<script lang="js">
import { useForm } from '../../../src'

export default {
  setup() {
    const { useField, validateFields, validateField, errors } = useForm({ validateMode: 'submit' })
    const username = useField('username', {
      rule: { required: true },
    })
    const password = useField('password', {
      rule: { required: true },
    })
    return {
      username,
      password,
      validateField,
      errors,
      async onSubmit(e) {
        e.preventDefault()
        await validateFields() // form-level validation
      },
    }
  },
}
</script>
