import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

let whiteList = ['/']
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    return next()
  }

  let hasLogin = await store.dispatch('validate')

  if (hasLogin) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    let needLogin = to.matched.some(item => item.meta.needLogin)
    if (needLogin) {
      next('/login')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
