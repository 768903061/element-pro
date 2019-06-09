import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import './permission'

Vue.config.productionTip = false
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import formCreate from 'form-create/element'
//import './element'


Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(formCreate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
