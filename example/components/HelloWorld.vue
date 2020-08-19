<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{values.name}}
    {{nameField.value}}
    <input
      type="text"
      :ref="nameField.ref"
      v-model="nameField.value"
    >
    <button @click="add">
      add
    </button>
    <TestInput v-model="nameField.value" ></TestInput>
  </div>
</template>

<script lang="tsx">
import {
  defineComponent, ref,
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
    const { values, register, setValue } = useForm({
      initialValues: { name: 'wang', age: 1, display: true },
    })
    const inputRef = ref(null)

    const nameField = register('name')

    return {
      values,
      nameField,
      inputRef,
      add: () => {
        console.log(nameField.ref)
      },
      handleTestInput: (v: any) => (console.log('-----', v)),
    }
  },
})
</script>
