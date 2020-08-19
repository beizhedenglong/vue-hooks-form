<template>
    <input
      type="text"
      :value="test"
      @input=" e => {
        e.stopPropagation()
        e.preventDefault()
        $emit('input', e.target.value)
      }"
    >
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue'

export default defineComponent({
  name: 'TestInput',
  components: {
  },
  props: {
    test: String,
  },
})
</script>
