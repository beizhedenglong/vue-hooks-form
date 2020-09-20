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
      values, register, getFieldValues,
      validate,
    } = useForm({
      defaultValues: {
        name: 'wang',
        age: 1,
        display: true,
        info: {
          email: 'hello@example.com',
        },
      },
    })
    const state = reactive({ visible: true })

    const nameField = register('name', {
      rule: { required: true },
    })
    const ageField = register('age')
    const emailField = register('info.email', {
      rule: { required: true, type: 'email' },
    })
    onMounted(() => {
      // setTimeout(() => { state.visible = false }, 4000)
    })

    return {
      values,
      nameField,
      submit: async () => {
        await validate()
      },
      ageField,
      emailField,
      state,
    }
  },
})
</script>
