<template>
  <div>
    <input
      type="text"
      :ref="nameField.ref"
      v-model="nameField.value"
      id="name"
    >
    <input type="text" :ref="ageField.ref" v-model="ageField.value">
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

export default defineComponent({
  name: 'Example',
  props: {
    defaultValues: { type: Object },
  },
  setup(props) {
    const {
      values, useField, getFieldValues,
      validateFields, validateField,
    } = useForm({ defaultValues: props.defaultValues })
    const state = reactive({ visible: true })

    const nameField = useField('name', {
      rule: { required: true, message: 'name is required' },
    })
    const ageField = useField('age', {
      rule: {
        type: 'number',
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

    return {
      values,
      nameField,
      submit: async () => {
        try {
          await validateFields()
        } catch ({ errors, fields }) {
          console.log(errors, fields)
        }
      },
      ageField,
      emailField,
      state,
      validateFields,
      validateField,
      getFieldValues,
    }
  },
})
</script>
