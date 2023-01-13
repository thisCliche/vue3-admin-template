import { RouteRecordRaw } from "vue-router";

/** 
 * 静态路由
 */
let staticRoutes:Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect: (to) => {
      return { name: 'adminMainLoading', query: { url: to.path, query: JSON.stringify(to.query) } }
    },
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login.vue'),
    meta:{
      title:'登录'
    }
  },
  {
    path: '/:path(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/common/404.vue'),
    meta: {
        title: '页面不存在', 
    },
  },
  {
    path: '/admin:path(.*)*',
    redirect: (to) => {
        return { name: 'adminMainLoading', query: { url: to.path, query: JSON.stringify(to.query) } }
    },
  },
]
// 动态路由写在这里 禁止不同账户下的子路由放在同一个父路由下
const dynamicBaseRoute:RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/index.vue'),
    redirect: '/admin/loading',
    meta: {
        title: 'Admin',
    },
    children: [
        {
            path: '/admin/loading',
            name: 'adminMainLoading',
            component: () => import('@/layouts/components/loading.vue'),
            meta: {
                title: 'Loading',
            },
        },
        {
          path:'/admin/dashboard',
          name:'dashboard',
          component:()=> import('@/views/dashboard.vue'),
          meta:{
            title:'控制台',
            extend:'none',
            icon:'local-dashboard',
            keepalive:0,
            type:'tab',
            addtab: true,
            id:1,
            pid:0,
          }
        },
        {
          path:'/admin/user',
          name:'user',
          redirect:'/admin/user/userInfo',
          meta:{
            title:'用户管理',
            extend:'none',
            icon:'local-user',
            keepalive:0,
            type:null,
            id:2,
            pid:0,
          },
          children:[
            {
              path:'/admin/user/userInfo',
              name:'userInfo',
              component:()=>import('@/views/user/userInfo.tsx'),
              meta:{
                title:'用户信息',
                extend:'none',
                icon:'local-userInfo',
                id:21,
                pid:2,
                keepalive:'user/userInfo',
                type:'tab',
                addtab: true,
              },
            },
            {
              path:'/admin/edit/userInfo/detail:id?',
              name:'userInfoDetail',
              component:()=>import('@/views/user/detail/index.vue'),
              meta:{
                title:'编辑/新增',
                active: "/admin/user/userInfo",  //保持某个颜色块激活
                hidden:true, // 隐藏
                extend:'none',
                icon:'',
                id:22,
                pid:0,
                keepalive:0,
                type:'tab',
                addtab:true
              }
            }
          ]
        },
        {
          path:'/admin/object',
          name:'object',
          redirect:'/admin/object/objectManage',
          meta:{
            title:'项目管理',
            extend:'none',
            icon:'local-object',
            keepalive:0,
            type:null,
            id:3,
            pid:0,
          },
          children:[
            {
              path:'/admin/object/objectManage',
              name:'objectManage',
              component:()=>import('@/views/object/objectManage.tsx'),
              meta:{
                title:'项目信息',
                extend:'none',
                icon:'local-objectManage',
                id:31,
                pid:2,
                keepalive:'object/objectManage',
                type:'tab',
                addtab: true,
              }
              
            }
          ]
        },
        {
          path:'/admin/api',
          name:'api',
          redirect:'/admin/api/apiMaintenance',
          meta:{
            title:'API管理',
            extend:'none',
            icon:'local-api',
            keepalive:0,
            type:null,
            id:4,
            pid:0,
          },
          children:[
            {
              path:'/admin/api/apiMaintenance',
              name:'apiMaintenance',
              component:()=>import('@/views/api/apiMaintenance.vue'),
              meta:{
                title:'API维护',
                extend:'none',
                icon:'local-apiManage',
                id:41,
                pid:2,
                keepalive:'api/apiMaintenance',
                type:'tab',
                addtab: true,
              }
            },
            {
              path:'/admin/api/keyAuthorization',
              name:'keyAuthorization',
              component:()=>import('@/views/api/keyAuthorization.vue'),
              meta:{
                title:'KEY授权',
                extend:'none',
                icon:'local-keyAuth',
                id:42,
                pid:2,
                keepalive:'api/keyAuthorization',
                type:'tab',
                addtab: true,
              }
            }
          ]
        },
        
    ]
}
staticRoutes.push(dynamicBaseRoute)

export { staticRoutes,dynamicBaseRoute }