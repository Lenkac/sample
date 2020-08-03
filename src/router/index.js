import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/cloudplatform/account',
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'dashboard',
    //     meta: { title: '仪表盘', icon: 'dashboard', affix: true }
    //   }
    // ]
  //},
  {
    path: '/resourceInfo',
    component: Layout,
    redirect: '/resourceInfo',
    hidden: true,
    children: [
      {
        path: 'imageVersion',
        component: () => import('@/views/resourceInfo/imageVersion'),
        name: 'imageVersion',
        meta: { title: 'imageVersion', icon: 'user', noCache: true }
      },
      {
        path: 'imageDetail',
        component: () => import('@/views/resourceInfo/imageDetail'),
        name: 'imageDetail',
        meta: { title: 'imageDetail', icon: 'user', noCache: true }
      },
      {
        path: 'nodeInfo',
        component: () => import('@/views/resourceInfo/nodeInfo'),
        name: 'nodeInfo',
        meta: { title: '主机信息', icon: 'user', noCache: true }
      },
      {
        path: 'containerInfo',
        component: () => import('@/views/resourceInfo/containerInfo'),
        name: 'containerInfo',
        meta: { title: '容器信息', icon: 'user', noCache: true }
      },
      {
        path: 'vmInfo',
        component: () => import('@/views/resourceInfo/vmInfo'),
        name: 'vmInfo',
        meta: { title: 'vm信息', icon: 'user', noCache: true }
      },
      {
        path: 'metadataInfo',
        component: () => import('@/views/resourceInfo/metadataInfo'),
        name: 'metadataInfo',
        meta: { title: 'metadataInfo', icon: 'user', noCache: true }
      },
      {
        path: 'instance',
        component: () => import('@/views/cloudPlatform/index'),
        name: 'instance',
        meta: { title: '实例', icon: 'user', noCache: true }
      },
      {
        path: 'monitor',
        component: () => import('@/views/cloudPlatform/monitor'),
        name: 'monitor',
        meta: { title: '监控', icon: 'user', noCache: true }
      },
      {
        path: 'podTerminal',
        component: () => import('@/views/resourceInfo/podTerminal'),
        name: 'podTerminal',
        meta: { title: 'pod远程', icon: 'user', noCache: true }
      },
      
      // {
      //   path: 'kanban',
      //   component: () => import('@/views/task/kanban'),
      //   name: 'kanban',
      //   meta: { title: 'kanban', icon: 'user', noCache: true }
      // },
      {
        path: 'simpleLayout',
        component: () => import('@/views/simpleLayout/index'),
        name: 'Frontend-leftRightLayout-user',
        meta: { title: '自定义布局', icon: 'user', noCache: true,data:{}}
      },
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  

  /** when your routing map is too long, you can split it into small modules **/
  
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router