<template>
  <div class="dark-switch">
    <DarkButton @click="toggleDark()" />
  </div>
  <div class="bg-banner" />
  <div id="login-box">
    <div class="login-banner">
      <img :src="banner" class="banner">
    </div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">
          欢迎访问 {{ title }} !
        </h3>
      </div>
      <div>
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder="用户名" text tabindex="1" autocomplete="on">
            <template #prefix>
              <Icon name="el-icon-User" size="16" color="var(--el-input-icon-color)" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="loginForm.pass" type="password" placeholder="密码" tabindex="2" autocomplete="on"
            show-password @keyup.enter="handleLogin">
            <template #prefix>
              <Icon name="el-icon-Lock" size="16" color="var(--el-input-icon-color)" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <el-input v-model="loginForm.checkCode" placeholder="验证码" text tabindex="3" autocomplete="on"
            @keyup.enter="handleLogin">
            <template #prefix>
              <Icon name="el-icon-More" size="16" color="var(--el-input-icon-color)" />
            </template>
            <template #suffix>
              <div class="code-img" @click="getCheckCode"><img :src="codeUrl" alt=""></div>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <div class="flex-bar">
        <el-link type="primary" :underline="false">
          忘记密码了?
        </el-link>
      </div>
      <el-button class="submit-button" :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
        登录
      </el-button>

      <div class="test-account" v-if="env == 'development'">
        <el-divider>测试账号一键登录</el-divider>
        <el-button type="primary" size="small" plain>
          admin
        </el-button>
        <el-button size="small" plain>
          user
        </el-button>
      </div>
    </el-form>
  </div>
  <Copyright />
</template>
  
<script lang="ts" setup>

import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import { login } from "@/api/login";
import Copyright from '@/components/copyright/index.vue'
import banner from '@/assets/img/banner.png'
import router from '@/router'
import { Local } from "@/utils/storage";
import { ACCOUNT_INFO } from '@/stores/constant/cacheKey'
import DarkButton from '@/layouts/common/darkButton.vue'
import toggleDark from '@/utils/useDark'

const title = process.env.VITE_NAME
const env = process.env.ENV
const loading = ref(false)
const loginFormRef = ref<FormInstance>()
const loginForm = ref<Record<string, any>>({ name: '', pass: '', checkCode: '' })
const loginRules = ref<FormRules>({
  name: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  pass: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkCode: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
})
let codeUrl = ref('')
let getCheckCode = () => {
  let num = Math.ceil(Math.random() * 10);
  codeUrl.value = new URL(`/v1/sys/login/getCaptcha?${num}`, process.env.VITE_AXIOS_BASE_URL).href
}
getCheckCode()
let handleLogin = () => {
  loginFormRef.value!.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        let res = await login(loginForm.value)
        loading.value = false
        getCheckCode()
        Local.set(ACCOUNT_INFO,res.data.result)
        router.push('/')
      } catch (error) {
        loading.value = false; 
        getCheckCode();
      }
    }
  })

}
</script>
  
<style lang="scss" scoped>
.dark-switch{
  position: fixed;
  z-index: 1;
  right: 20px;
  top: 20px;
}
.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--el-fill-color-lighter), var(--el-bg-color-page));
}

#login-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: var(--el-bg-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow);
  z-index: 99;

  .login-banner {
    position: relative;
    width: 450px;
    background-color: var(--el-fill-color-light);
    overflow: hidden;

    .banner {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }


  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 500px;
    width: 500px;
    padding: 50px;
    overflow: hidden;

    .submit-button {
      width: 100%;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 1.3em;
        color: var(--el-text-color-primary);
        margin: 0 auto 30px;
        font-weight: bold;
      }
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-input) {
      height: 48px;
      line-height: inherit;
      width: 100%;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }

    .code-img {
      width: 100px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .test-account {
    margin-top: 20px;
    margin-bottom: -20px;
    text-align: center;
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }


}

@at-root .dark {
  #login-box {
    .login-banner {
      .banner {
        filter: brightness(60%)
      }
    }

    .submit-button {
      --el-button-bg-color: var(--el-color-primary-light-5);
      --el-button-border-color: rgba(240, 252, 241, 0.1);
    }
  }
}

.copyright {
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin: 0;
}
</style>
  