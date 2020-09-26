<template>
  <div class="hello">
    <div>{{ errorFields }}</div>
    <div>{{values}}</div>
    <input
      type="text"
      :ref="nameField.ref"
      v-model="nameField.value"
      v-if="state.visible"
    />
    <br>
    <TestInput
      v-if="state.visible"
      v-model="ageField.value"
      :ref="ageField.ref"
    ></TestInput>
    {{ageField.errors}}
    <br>
    <input type="email" v-model="emailField.value" :ref="emailField.ref" />
    {{emailField.errors}}
    <br>
    <button @click="submit">submit</button>
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
      values,
      useField,
      getFieldValues,
      errorFields,
      validateFields,
      validateField,
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
      rule: {
        type: 'number',
        required: true,
        validator: (rule, value, cb) => {
          if (value < 10) {
            cb('age less than ten!')
          }
        },
      },
    })
    const emailField = useField('info.email', {
      rule: { required: true, type: 'email' },
    })
    onMounted(() => {
      // setTimeout(() => { state.visible = false }, 4000)
    })

    return {
      errorFields,
      values,
      nameField,
      submit: async () => {
        try {
          await validateFields()
        } catch (errors) {
          console.log('outer', errors)
        }
      },
      ageField,
      emailField,
      state,
    }
  },
})
</script>
