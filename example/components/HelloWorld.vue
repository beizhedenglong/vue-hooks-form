<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{values.name}}
    {{nameField.value}}
    <input
      type="text"
      :ref="nameField.ref"
      v-model="nameField.value"
      v-if="state.visible"
    >
    <TestInput v-if="state.visible" v-model="ageField.value" :ref="ageField.ref"></TestInput>
    <input
      type="email"
      v-model="emailField.value" :ref="emailField.ref"
    >
    <button @click="submit">
      submit
    </button>
  </div>
</template>

<script lang="tsx">
import {
  defineComponent, ref, reactive, onMounted,
} from 'vue'
import { useForm } from '../../src'
import TestInput from './TestInput.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: {
    TestInput,
  },
  props: {
    msg: String,
  },
  setup() {
    const {
      values, useField, getFieldValues,
      validate, validateField,
    } = useForm({
      defaultValues: {
        name: 'wang',
        age: 1,
        info: {
          email: 'hello@example.com',
        },
      },
    })
    const state = reactive({ visible: true })

    const nameField = useField('name', {
      rule: { required: true, message: 'name is required' },
    })
    const ageField = useField('age', {
      rule: { type: 'number' },
    })
    const emailField = useField('info.email', {
      rule: { required: true, type: 'email' },
    })
    onMounted(() => {
      // setTimeout(() => { state.visible = false }, 4000)
    })

    return {
      values,
      nameField,
      submit: async () => {
        try {
          // await validate()
          await validateField('info.email')
          await validateField('name')
        } catch ({ error, fields }) {
          console.log(error, fields)
        }
      },
      ageField,
      emailField,
      state,
    }
  },
})
</script>
