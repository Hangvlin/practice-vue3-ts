import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'
import { mapMenusToRoutes } from './utiles/map-menus'

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()

mapMenusToRoutes([])

app.mount('#app')
