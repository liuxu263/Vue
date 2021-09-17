import App from './App.vue'
import { createApp } from 'vue'

import { setupStore } from './store' //状态管理
import router, { setupRouter } from './router' //路由

// import './styles/index.scss'
import { setupElement } from './libs/elements'



const app = createApp(App)
setupRouter(app) //引入路由
setupStore(app) //引入状态管理
setupElement(app) //引入ElementUi
router.isReady().then(() => {
    app.mount('#app')
})