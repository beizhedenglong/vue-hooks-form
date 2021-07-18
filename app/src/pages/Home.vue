<template>
  <div style="width: 100px">
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.path }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = ref(router.getRoutes())
</script>
