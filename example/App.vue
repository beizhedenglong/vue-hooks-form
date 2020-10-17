<template>
  <div id="app">
    <Demo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Demo from './components/Demo.vue'

export default defineComponent({
  name: 'App',
  components: {
    Demo,
  },
})
</script>
