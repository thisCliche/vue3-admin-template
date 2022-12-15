<template>
    <div class="nav-menus" :class="configStore.layout.layoutMode">
        <div @click="onFullScreen" class="nav-menu-item" :class="state.isFullScreen ? 'hover' : ''">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" v-if="state.isFullScreen"
                name="local-full-screen-cancel" size="18" />
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" v-else
                name="el-icon-FullScreen" size="18" />
        </div>
        <div class="nav-menu-item" title="清理配置缓存" @click="onClearCache"
            :class="state.currentNavMenu == 'clear' ? 'hover' : ''">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" name="el-icon-Delete"
                size="18" />
        </div>
        <el-popover @show="onCurrentNavMenu(true, 'adminInfo')" @hide="onCurrentNavMenu(false, 'adminInfo')"
            placement="bottom-end" :hide-after="0" :width="260" trigger="click" popper-class="admin-info-box">
            <template #reference>
                <div class="admin-info" :class="state.currentNavMenu == 'adminInfo' ? 'hover' : ''">
                    <el-avatar :size="25" fit="fill">
                        <img src="//demo.buildadmin.com/static/images/avatar.png" alt="" />
                    </el-avatar>
                    <div class="admin-name">admin</div>
                </div>
            </template>
            <div>
                <div class="admin-info-base">
                    <el-avatar :size="70" fit="fill">
                        <img src="//demo.buildadmin.com/static/images/avatar.png" alt="" />
                    </el-avatar>
                    <div class="admin-info-other">
                        <div class="admin-info-name">admin</div>
                        <div class="admin-info-lasttime">2022-12-10 09:20:49</div>
                    </div>
                </div>
                <div class="admin-info-footer">
                    <el-button @click="onAdminInfo" type="primary" plain>个人资料</el-button>
                    <el-button @click="onLogout" type="danger" plain>注销</el-button>
                </div>
            </div>
        </el-popover>
        <div @click="configStore.setLayout('showDrawer', true)" class="nav-menu-item">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" class="nav-menu-icon" name="el-icon-Tools"
                size="18" />
        </div>
        <Config />
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import screenfull from 'screenfull'
import { useConfig } from '@/stores/config'
import Config from './config.vue'
import { Local, Session } from '@/utils/storage'
import { ACCOUNT_INFO } from '@/stores/constant/cacheKey'
import { ElNotification, ElMessage } from 'element-plus'
import router from '@/router'
import { routePush } from '@/utils/router'

const configStore = useConfig()

const state = reactive({
    isFullScreen: false,
    currentNavMenu: '',
    showLayoutDrawer: false,
})

const onCurrentNavMenu = (status: boolean, name: string) => {
    state.currentNavMenu = status ? name : ''
}

const onFullScreen = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning('您的浏览器不支持全屏，请更换浏览器再试~')
        return false
    }
    screenfull.toggle()
    screenfull.onchange(() => {
        state.isFullScreen = screenfull.isFullscreen
    })
}

const onAdminInfo = () => {
    //   routePush({ name: 'routine/adminInfo' })
}

const onLogout = () => {
    Local.remove(ACCOUNT_INFO)
    router.go(0)
}

const onClearCache = () => {
    const adminInfo = Local.get(ACCOUNT_INFO)
    Session.clear()
    Local.clear()
    Local.set(ACCOUNT_INFO, adminInfo)
    ElNotification({ type: 'success', message: '清除成功' })
}
</script>

<style scoped lang="scss">
.nav-menus.Default {
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-light);
}

.nav-menus {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: auto;
    background-color: v-bind('configStore.getColorVal("headerBarBackground")');
    overflow: hidden;

    .nav-menu-item {
        height: 100%;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .nav-menu-icon {
            box-sizing: content-box;
            color: v-bind('configStore.getColorVal("headerBarTabColor")');
        }

        &:hover {
            .icon {
                animation: twinkle 0.3s ease-in-out;
            }
        }
    }

    .admin-info {
        display: flex;
        height: 100%;
        padding: 0 10px;
        align-items: center;
        cursor: pointer;
        user-select: none;
        color: v-bind('configStore.getColorVal("headerBarTabColor")');
    }

    .admin-name {
        padding-left: 6px;
        white-space: nowrap;
    }

    .nav-menu-item:hover,
    .admin-info:hover,
    .nav-menu-item.hover,
    .admin-info.hover {
        background: v-bind('configStore.getColorVal("headerBarHoverBackground")');
    }
}

.dropdown-menu-box :deep(.el-dropdown-menu__item) {
    justify-content: center;
}

.admin-info-base {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 10px;

    .admin-info-other {
        display: block;
        width: 100%;
        text-align: center;
        padding: 10px 0;

        .admin-info-name {
            font-size: var(--el-font-size-large);
        }
    }
}

.admin-info-footer {
    padding: 10px 0;
    margin: 0 -12px -12px -12px;
    display: flex;
    justify-content: space-around;
}


@keyframes twinkle {
    0% {
        transform: scale(0);
    }

    80% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>
