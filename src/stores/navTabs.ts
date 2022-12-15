import { isEmpty } from 'lodash-es'
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { STORE_TAB_VIEW_CONFIG } from '@/stores/constant/cacheKey'
import { NavTabs } from '@/stores/interface/index'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export const useNavTabs = defineStore(
    'navTabs',
    () => {
        const state: NavTabs = reactive({
            // 激活tab的index
            activeIndex: 0,
            // 激活的tab
            activeRoute: null,
            // tab列表
            tabsView: [],
            // 当前tab是否全屏
            tabFullScreen: false,
            // 从后台加载到的菜单路由列表
            tabsViewRoutes: [],
        })

        function addTab(route: RouteLocationNormalized) {
            if (!route.meta.addtab) return
            for (const key in state.tabsView) {
                if (state.tabsView[key].path === route.path) {
                    state.tabsView[key].params = !isEmpty(route.params) ? route.params : state.tabsView[key].params
                    state.tabsView[key].query = !isEmpty(route.query) ? route.query : state.tabsView[key].query
                    return
                }
            }
            state.tabsView.push(route)
        }

        function closeTab(route: RouteLocationNormalized) {
            state.tabsView.map((v, k) => {
                if (v.path == route.path) {
                    state.tabsView.splice(k, 1)
                    return
                }
            })
        }

        /**
         * 关闭多个标签
         * @param retainMenu 需要保留的标签，否则关闭全部标签
         */
        const closeTabs = (retainMenu: RouteLocationNormalized | false = false) => {
            if (retainMenu) {
                state.tabsView = [retainMenu]
            } else {
                state.tabsView = []
            }
        }
        // 设置当前激活的标签导航
        const setActiveRoute = (route: RouteLocationNormalized): void => {
            const currentRouteIndex: number = state.tabsView.findIndex((item: RouteLocationNormalized) => {
                return item.path === route.path
            })
            if (currentRouteIndex === -1) return
            state.activeRoute = route
            state.activeIndex = currentRouteIndex
        }
        // 更新stores中的路由菜单数据
        const setTabsViewRoutes = (data: RouteRecordRaw[]): void => {
            state.tabsViewRoutes = data
        }

        const setFullScreen = (fullScreen: boolean): void => {
            state.tabFullScreen = fullScreen
        }
        return { state, addTab, closeTab, closeTabs, setActiveRoute, setTabsViewRoutes, setFullScreen }
    },
    {
        persist: {
            key: STORE_TAB_VIEW_CONFIG,
            // 指定储存的store
            paths: ['tabFullScreen'],
        },
    }
)
