import 'babel-polyfill'  //引入babel-polyfill 兼容IE9以及以上
import Vue from 'vue'

// import Vuex from 'vuex'
//引入全局自定义公共组件(插件)
import Cc from '@/components/cc-ui/index';

//路由插件
import VueRouter from 'vue-router'

//UI 框架
import ElementUI from 'element-ui';

//引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css'

//引入ElementUI样式
import '@/theme/index.css'

//引入路由配置文件
import router from '@/router'

//引入状态管理
// import store from '@/vuex/store'
//引入公共样式
import '@/assets/style/sass/common.scss'

//引入图标样式
import "@/assets/fonts/iconfont.css";

// 引入动画样式
import '@/assets/style/sass/transition.scss';

//引入自定义字体
import '@/assets/custom-fonts/font.css';
import App from './App'

Vue.config.productionTip = false;   //是否关闭生产模式下给出的提示
Vue.prototype.$bus = new Vue;   //事件
Vue.use(Cc);
Vue.use(VueRouter);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
