import error404 from './404.vue'
import { useAppConfigStore } from '@rw-vue-framework/stores';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';


const noNeedLoginPath = ['/login']; // no redirect whitelist
const errorPath = ['/404']
export const routes: RouteRecordRaw[] = [
  {
    path: "/:catchAll(.*)",
    name: "PageError",
    component: error404
  }
]

// 菜单list
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})
router.afterEach((to) => {
  const appConfig = useAppConfigStore()
  document.title = appConfig.title + "-" + to.meta.title
})

router.beforeEach(async (to) => {
  //如果是登录页面或者错误页面，则自动进入，不再处理下面内容
  if (noNeedLoginPath.indexOf(to.path) !== -1 || errorPath.indexOf(to.path) !== -1) {
    return true;
  }
  //判断是否登录或者相应数据是否丢失
  // const user = useUserStore()

  // if ((user.checkLoginTimeout() || !user.checkLogin())) { //判断登录是否超时，以及是否登录
  //   return "/login?redirect=" + to.fullPath
  // }
  // const menus = useMenusStore()
  // if (!menus.routeMaked) {
  //   await menus.makeRoutes()
  //   menus.routeMaked = true
  // }

  // const thisRoute = await router.getRoutes().find(routeInfo => routeInfo.path == to.path)
  // if (thisRoute == undefined) {//判断如果没有找到
  //   return "/404";
  // } else {
  //   if (to.name == "PageError") {
  //     menus.setActiveMenu(thisRoute)
  //     return { path: thisRoute.path }
  //   } else {
  //     return;
  //   }
  // }
})

export default router
