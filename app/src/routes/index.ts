import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Demo from '../pages/Demo.vue'
import Input from '../pages/Input.vue'
import Test from '../pages/Test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/demo',
    component: Demo,
  },
  {
    path: '/input',
    component: Input,
  },
  {
    path: '/test',
    component: Test,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
