<template>
  <form @submit="handleSubmit">
    <input v-bind="register('aaa')" />
    <select name="bbb">
      <option value="female">female</option>
      <option value="male">male</option>
      <option value="other">other</option>
    </select>
    <button type="submit">submit</button>
  </form>
</template>

<script lang="ts" setup>
import { useRegisterForm } from '../../../src'

const { register } = useRegisterForm()
const handleSubmit = (e: Event) => {
  if (e) {
    e.preventDefault && e.preventDefault()
  }
}

</script>
