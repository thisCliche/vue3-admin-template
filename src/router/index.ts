import {createRouter, createWebHashHistory} from 'vue-router'
import { start, done } from "@/utils/nprogress";
import { staticRoutes } from "./static";
import { loading } from "@/utils/loading";
import { Local } from "@/utils/storage";
import { ACCOUNT_INFO } from '@/stores/constant/cacheKey'

const router = createRouter({
  history:createWebHashHistory(),
  routes:staticRoutes,
})

router.beforeEach((to,from,next)=>{
  start()
  // 第一次加载页面会有全屏的加载动画
  if(!window.existLoading){
    loading.show()
    window.existLoading = true
  }
  if(to.path=='/login'){
    next()
  }else{
    let user = Local.get(ACCOUNT_INFO)
    if(user){
      next()
    }else{
      next('/login')
    }
  }
})
router.afterEach(() => {
  if(window.existLoading){
    loading.hide()
  }
  done()
})

export default router