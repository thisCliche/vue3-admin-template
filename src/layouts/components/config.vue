<template>
    <div class="layout-config-drawer">
        <el-drawer :model-value="configStore.layout.showDrawer" title="布局配置" size="310px" @close="onCloseDrawer">
            <el-scrollbar class="layout-mode-style-scrollbar">
                <el-form ref="formRef" :model="configStore.layout">
                    <div class="layout-mode-styles-box">
                        <el-divider border-style="dashed">布局方式</el-divider>
                        <div class="layout-mode-box-style">
                            <el-row class="layout-mode-box-style-row" :gutter="10">
                                <el-col :span="12">
                                    <div @click="setLayoutMode('Default')" class="layout-mode-style default"
                                        :class="configStore.layout.layoutMode == 'Default' ? 'active' : ''">
                                        <div class="layout-mode-style-box">
                                            <div class="layout-mode-style-aside"></div>
                                            <div class="layout-mode-style-container-box">
                                                <div class="layout-mode-style-header"></div>
                                                <div class="layout-mode-style-container"></div>
                                            </div>
                                        </div>
                                        <div class="layout-mode-style-name">默认</div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div @click="setLayoutMode('Classic')" class="layout-mode-style classic"
                                        :class="configStore.layout.layoutMode == 'Classic' ? 'active' : ''">
                                        <div class="layout-mode-style-box">
                                            <div class="layout-mode-style-aside"></div>
                                            <div class="layout-mode-style-container-box">
                                                <div class="layout-mode-style-header"></div>
                                                <div class="layout-mode-style-container"></div>
                                            </div>
                                        </div>
                                        <div class="layout-mode-style-name">经典</div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <div @click="setLayoutMode('Streamline')" class="layout-mode-style streamline"
                                        :class="configStore.layout.layoutMode == 'Streamline' ? 'active' : ''">
                                        <div class="layout-mode-style-box">
                                            <div class="layout-mode-style-container-box">
                                                <div class="layout-mode-style-header"></div>
                                                <div class="layout-mode-style-container"></div>
                                            </div>
                                        </div>
                                        <div class="layout-mode-style-name">单栏</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider border-style="dashed">全局</el-divider>
                        <div class="layout-config-global">
                            <el-form-item size="large" label="暗黑模式">
                                <DarkSwitch @click="toggleDark()" />
                            </el-form-item>
                            <el-form-item label="页面切换动画">
                                <el-select @change="onCommitState($event, 'mainAnimation')"
                                    :model-value="configStore.layout.mainAnimation" placeholder="请选择动画">
                                    <el-option label="slide-right" value="slide-right"></el-option>
                                    <el-option label="slide-left" value="slide-left"></el-option>
                                    <el-option label="fade-in-linear" value="el-fade-in-linear"></el-option>
                                    <el-option label="fade-in" value="el-fade-in"></el-option>
                                    <el-option label="zoom-in-center" value="el-zoom-in-center"></el-option>
                                    <el-option label="zoom-in-top" value="el-zoom-in-top"></el-option>
                                    <el-option label="zoom-in-bottom" value="el-zoom-in-bottom"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-divider border-style="dashed">侧边栏</el-divider>
                        <div class="layout-config-aside">
                            <el-form-item label="显示LOGO">
                                <el-switch @change="onCommitState($event, 'menuShowTopBar')"
                                    :model-value="configStore.layout.menuShowTopBar"></el-switch>
                            </el-form-item>
                            <el-form-item label="侧边水平折叠">
                                <el-switch @change="onCommitState($event, 'menuCollapse')"
                                    :model-value="configStore.layout.menuCollapse"></el-switch>
                            </el-form-item>
                            <el-form-item label="侧边菜单手风琴">
                                <el-switch @change="onCommitState($event, 'menuUniqueOpened')"
                                    :model-value="configStore.layout.menuUniqueOpened"></el-switch>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/stores/config'
import { BEFORE_RESIZE_LAYOUT } from '@/stores/constant/cacheKey'
import { Session } from '@/utils/storage'
import DarkSwitch from '../common/darkSwitch.vue'
import toggleDark from '@/utils/useDark'


const configStore = useConfig()

const onCommitState = (value: any, name: any) => {
    configStore.setLayout(name, value)
}

const setLayoutMode = (mode: string) => {
    Session.set(BEFORE_RESIZE_LAYOUT, {
        layoutMode: mode,
        menuCollapse: configStore.layout.menuCollapse,
    })
    configStore.setLayoutMode(mode)
}

const onCloseDrawer = () => {
    configStore.setLayout('showDrawer', false)
}


</script>

<style scoped lang="scss">
.layout-config-drawer :deep(.el-input__inner) {
    padding: 0 0 0 6px;
}

.layout-config-drawer :deep(.el-input-group__append) {
    padding: 0 10px;
}

.layout-config-drawer :deep(.el-drawer__header) {
    margin-bottom: 0 !important;
}

.layout-config-drawer :deep(.el-drawer__body) {
    padding: 0;
}

.layout-mode-styles-box {
    padding: 20px;
}

.layout-mode-box-style-row {
    margin-bottom: 15px;
}

.layout-mode-style {
    position: relative;
    height: 100px;
    border: 1px solid var(--el-border-color-light);
    border-radius: var(--el-border-radius-small);

    &:hover,
    &.active {
        border: 1px solid var(--el-color-primary);
    }

    .layout-mode-style-name {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-color-primary-light-5);
        border-radius: 50%;
        height: 50px;
        width: 50px;
        border: 1px solid var(--el-color-primary-light-3);
    }

    .layout-mode-style-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &.default {
        display: flex;
        align-items: center;
        justify-content: center;

        .layout-mode-style-aside {
            width: 18%;
            height: 90%;
            background-color: var(--el-border-color-lighter);
        }

        .layout-mode-style-container-box {
            width: 68%;
            height: 90%;
            margin-left: 4%;

            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color-lighter);
            }

            .layout-mode-style-container {
                width: 100%;
                height: 85%;
                background-color: var(--el-border-color-extra-light);
                margin-top: 5%;
            }
        }
    }

    &.classic {
        display: flex;
        align-items: center;
        justify-content: center;

        .layout-mode-style-aside {
            width: 18%;
            height: 100%;
            background-color: var(--el-border-color-lighter);
        }

        .layout-mode-style-container-box {
            width: 82%;
            height: 100%;

            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color);
            }

            .layout-mode-style-container {
                width: 100%;
                height: 90%;
                background-color: var(--el-border-color-extra-light);
            }
        }
    }

    &.streamline {
        display: flex;
        align-items: center;
        justify-content: center;

        .layout-mode-style-container-box {
            width: 100%;
            height: 100%;

            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color);
            }

            .layout-mode-style-container {
                width: 100%;
                height: 90%;
                background-color: var(--el-border-color-extra-light);
            }
        }
    }
}

.w80 {
    width: 90%;
}
</style>
