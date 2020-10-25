<template>
  <form @submit="onSubmit">
    <label>Username</label>
    <input v-model="username.value" :ref="username.ref" />
    <!-- form-level errors -->
    <p v-if="errors.username">{{ errors.username.message }}</p>
    <label>Password</label>
    <input v-model="password.value" :ref="password.ref" type="password" />
    <!-- field-level error -->
    <p v-if="password.error">{{ password.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from 'vue-hooks-form'

export default {
  setup() {
    const { useField, errors, handleSubmit } = useForm({
      defaultValues: {},
    })
    const username = useField('username', {
      rule: { required: true },
    })
    const password = useField('password', {
      rule: { required: true },
    })
    return {
      username,
      password,
      errors,
      onSubmit: handleSubmit(console.log),
    }
  },
}
</script>
