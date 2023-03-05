import Main from '@/views/Main.vue'
import { HOME_ROUTE } from '@/model/commonConstant'
import { getMenus } from '@/config'
const components = import.meta.glob('@/views/*/*.vue')

export const routes = [
  {
    path: '/',
    redirect: HOME_ROUTE
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../../views/error/404.vue')
  },
  {
    path: HOME_ROUTE,
    component: Main,
    children: getRoutes()
  }
]

function getRoutes() {
  const result = []
  for (const menu of getMenus()) {
    result.push({
      path: menu.path ? menu.path : '',
      component: components[`/src/views${menu.path}.vue`],
      meta: { name: menu.name }
    })
  }
  return result
}
