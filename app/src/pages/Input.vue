<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control has-icons-left has-icons-right">
      <input
        :class="['input', isDanger ? 'is-danger' : '']"
        type="text"
        :value="modelValue"
        v-bind="$attrs"
        @input="e => $emit('update:modelValue', e.target.value)"
      >
      <span class="icon is-small is-left">
        <i :class="['fas', icon]" />
      </span>
      <p class="help is-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  components: {},
  props: {
    modelValue: String,
    label: String,
    icon: String,
    errorMessage: String,
    isDanger: Boolean,
  },
  emits: ['update:modelValue'],
})
</script>
