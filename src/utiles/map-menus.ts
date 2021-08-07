import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1. 加载所有的路由
  const allRoutes: RouteRecordRaw[] = []
  // routeFiles.keys() 返回一个存放所有文件路径的数组
  const routeFiles = require.context('../router/main', true, /\.ts/)
  console.log(routeFiles.keys())
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route)
    console.log(allRoutes)
  })

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
