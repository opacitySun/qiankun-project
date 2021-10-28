import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/styles/common.scss";

/**
 * 第三方库
 */
import _ from "lodash";
import "zone.js/dist/zone";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app-main");

//使用serviceWorker开启独立线程，优化缓存内容加载速度
// if('serviceWorker' in window.navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./serviceWorker.ts', {scope: './'})
//       .then((reg) => {
//         console.log('ServiceWorker registration successful with scope: ', reg.scope);
//       })
//       .catch(err => {
//         throw new Error('ServiceWorker registration failed: ' + err);
//       });
//   })
// }
