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
        asyncValidator: async (rule, value) => new Promise((resolve, reject) => {
          if (value !== 'Bob') {
            return reject(new Error('username must be Bob!'))
          }
          return resolve()
        }),
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
