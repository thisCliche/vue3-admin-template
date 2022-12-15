import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

export interface Layout {
  showDrawer: boolean
    shrink: boolean
    layoutMode: string
    mainAnimation: string
    isDark: boolean
    menuWidth: number
    menuDefaultIcon: string
    menuCollapse: boolean
    menuUniqueOpened: boolean
    menuShowTopBar: boolean
    menuBackground: string[]
    menuColor: string[]
    menuActiveBackground: string[]
    menuActiveColor: string[]
    menuTopBarBackground: string[]
    headerBarTabColor: string[]
    headerBarBackground: string[]
    headerBarHoverBackground: string[]
    headerBarTabActiveBackground: string[]
    headerBarTabActiveColor: string[]
}

export interface NavTabs {
  activeIndex: number
  activeRoute: RouteLocationNormalized | null
  tabsView: RouteLocationNormalized[]
  tabFullScreen: boolean
  tabsViewRoutes: RouteRecordRaw[]
  // authNode: Map<string, string[]>
}

