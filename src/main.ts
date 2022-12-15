import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import mitt from 'mitt'  
import ElementPlus from 'element-plus'
import { registerIcons } from "@/utils/common";
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
registerIcons(app)
app.mount('#app')

app.config.globalProperties.eventBus = mitt()
