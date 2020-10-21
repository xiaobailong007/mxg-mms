import Vue from "vue"
//注意引用在Vue的下面
// ElementUI组件库
import EelementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue"
import router from "./router"

//使用ElementUI
Vue.use(EelementUI)

//权限拦截
import './permission'

//判断是否运行环境 开发环境development   生产环境production
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
