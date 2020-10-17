<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control has-icons-left has-icons-right">
      <input
        :class="['input', isDanger ? 'is-danger': '' ]"
        type="text"
        :value="modelValue"
        @input="e => $emit('update:modelValue', e.target.value)"
        v-bind="$attrs"
      />
      <span class="icon is-small is-left">
        <i :class="['fas', icon]"></i>
      </span>
      <p class="help is-danger">{{errorMessage}}</p>
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
  computed: {
    iconClass(): string {
      return this.icon ? `fas ${this.icon}` : ''
    },
  },
})
</script>
