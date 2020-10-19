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
import { useForm } from '../../src'

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
