import router from '@/router/index'
import { isNavigationFailure, NavigationFailureType, RouteRecordRaw, RouteLocationRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useNavTabs } from '@/stores/navTabs'
import { dynamicBaseRoute } from '@/router/static'

/**
 * 导航失败有错误消息的路由push
 * @param to — 导航位置，同 router.push
 */
export const routePush = async (to: RouteLocationRaw) => {
    try {
        const failure = await router.push(to)
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
            ElNotification({
                message: '导航失败，导航守卫拦截！',
                type: 'error',
            })
        } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            ElNotification({
                message: '导航失败，已在导航目标位置！',
                type: 'warning',
            })
        }
    } catch (error) {
        ElNotification({
            message: '导航失败，路由无效！',
            type: 'error',
        })
        console.error(error)
    }
}

/**
 * 获取第一个菜单
 */
export const getFirstRoute = (routes: RouteRecordRaw[]): false | RouteRecordRaw => {
    const routerPaths: string[] = []
    const routers = router.getRoutes()
    routers.forEach((item) => {
        if (item.path) routerPaths.push(item.path)
    })
    let find: boolean | RouteRecordRaw = false
    for (const key in routes) {
        if (routes[key].meta?.type == 'tab' && routerPaths.indexOf(routes[key].path) !== -1) {
            return routes[key]
        } else if (routes[key].children && routes[key].children?.length) {
            find = getFirstRoute(routes[key].children!)
            if (find) return find
        }
    }
    return find
}
/**获取当前用户下的所有path */
export const getAllRoute = (router:BackendRouter):Array<string> => {
    let routerPaths :string[] = []
    router.map(item=>{
        if(item.children.length==0){
            routerPaths.push(`/admin/${item.path}`)
        }else{
            item.children.map(child=>{
                routerPaths.push(`/admin/${item.path}/${child}`)
            })
        }
    })
    return routerPaths
}

/**
 * 打开侧边菜单
 * @param menu 菜单数据
 */
export const onClickMenu = (menu: RouteRecordRaw) => {
    switch (menu.meta?.type) {
        case 'iframe':
        case 'tab':
            routePush({ name: menu.name })
            break
        case 'link':
            window.open(menu.path, '_blank')
            break

        default:
            ElNotification({
                message: '导航失败，菜单类型无法识别！',
                type: 'error',
            })
            break
    }
}

export const handleAdminRoute = (routes:Array<any>) => {
    let menuRule:Array<RouteRecordRaw> = []
    routes.map(item=>{
        dynamicBaseRoute!.children?.map(target=>{
            if(item.path == target.name){
                menuRule.push(target)
            }
        })
    })
    // 更新stores中的路由菜单数据
    const navTabs = useNavTabs()
    navTabs.setTabsViewRoutes(menuRule)
}
