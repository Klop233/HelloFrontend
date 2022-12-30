import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'

createApp(App)
    .use(ElementPlus)
    .mount('#app')
