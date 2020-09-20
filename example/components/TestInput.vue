<template>
    <input
      type="text"
      :value="modelValue"
      @input=" e => {
        e.stopPropagation()
        e.preventDefault()
        $emit('update:modelValue', e.target.value)
      }"
    >
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted,
} from 'vue'

export default defineComponent({
  name: 'TestInput',
  components: {
  },
  props: {
    modelValue: String,
  },
})
</script>
