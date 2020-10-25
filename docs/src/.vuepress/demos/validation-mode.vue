<template>
  <form @submit="onSubmit">
    <label>Username</label>
    <input v-model="username.value" :ref="username.ref" />
    <p v-if="username.error">{{username.error.message }}</p>
    <label>Password</label>
    <input v-model="password.value" :ref="password.ref" type="password" />
    <p v-if="password.error">{{password.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from 'vue-hooks-form'

export default {
  setup() {
    const {
      useField, handleSubmit,
    } = useForm({
      defaultValues: {},
      validateMode: 'submit',
    })
    const username = useField('username', {
      rule: { required: true },
    })
    const password = useField('password', {
      rule: { required: true },
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
