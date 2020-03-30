import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'
import {post,ppost,pppost,get,deleteInfo,put} from './request/http'

//时间转换
import moment from "moment"
Vue.prototype.$moment = moment;

//请求
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$ppost = ppost;
Vue.prototype.$pppost = pppost;
Vue.prototype.$delete = deleteInfo;
Vue.prototype.$put=put;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
