// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入App这个组件
import App from './App'
// 引入路由配置
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // 最后效果将会替换页面中id为app的div元素
  el: '#app',
  // 使用路由
  router,
  // 告知页面这个组件用这样的标签来包裹着,并且使用它
  components: { App },
  // 告知当前页面想使用App这个组件
  template: '<App/>'
})
