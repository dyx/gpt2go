import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

// https://router.vuejs.org/zh/guide/index.html#javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
