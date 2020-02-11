import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'
import {post,get,deleteInfo,put} from './request/http'

//图表
import echarts from 'echarts'


//请求
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$delete = deleteInfo;
Vue.prototype.$put=put;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
