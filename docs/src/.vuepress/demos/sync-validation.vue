<template>
  <form @submit="onSubmit">
    <label>Username</label>
    <input v-model="username.value" :ref="username.ref" />
    <p v-if="username.error">{{ username.error.message }}</p>
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
      defaultValues: {
        username: 'Victor',
      },
    })
    const username = useField('username', {
      rule: {
        required: true,
        validator: (rule, value) => {
          if (value !== 'Bob') {
            return new Error('username must be Bob!')
          }
          return true
        },
      },
    })
    const onSubmit = (data) => console.log(data)
    return {
      username,
      onSubmit: handleSubmit(onSubmit),
    }
  },
}
</script>
