<template>
  <h1 class="title is-1 container">Vue Hooks Form</h1>
  <div class="tile columns">
    <div class="column tile ">
      <div class="tile is-child box">
        <h2 class="title">Example:</h2>
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
          :error-message="
            confirmedPassword.error && confirmedPassword.error.message
          "
        />
        <button class="button is-link" @click="onSubmit">Submit</button>
      </div>
    </div>
    <div class="column tile">
      <div class="tile is-child box">
        <h2 class="title">Values:</h2>
        <pre>{{ JSON.stringify(values, null, 2) }}</pre>
      </div>
    </div>
    <div class="column tile">
      <div class="tile is-child box">
        <h2 class="title">ErrorFields:</h2>
        <pre>{{ JSON.stringify(errorFields, null, 2) }}</pre>
      </div>
    </div>
  </div>
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
      errorFields,
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
      errorFields,
      values,
    }
  },
})
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
