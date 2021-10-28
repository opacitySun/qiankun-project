import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
// import router from "@src/router";
import routes from "@src/router/routes";
import { store, key } from "@src/store";
import App from '@src/App.vue';
import "@src/styles/common.scss";

/**
 * 第三方库
 */
import _ from 'lodash';

let instance: any = null;
let router: any = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
 function render(props: any) {
  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  const routerBase = qiankunWindow.__POWERED_BY_QIANKUN__ ? "/micro/vue3" : "/";
  router = createRouter({
    history: createWebHistory(routerBase),
    routes: routes
  });

  //容器dom或id
  const containerEle = props.container ? props.container.querySelector('#app') : '#app';
  // 挂载应用
  instance = createApp(App);
  instance.use(router).use(store, key).mount(containerEle);
}

renderWithQiankun({
  /**
   * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
   */
  mount(props) {
    console.log("Vue3MicroApp mount", props);
    render(props);
  },
  /**
   * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
   * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
   */
  bootstrap() {
    console.log("Vue3MicroApp bootstraped");
  },
  /**
   * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
   */
  unmount(props: any) {
    console.log("Vue3MicroApp unmount");
    //卸载应用实例
    instance.unmount();
    instance = null;
    router = null;
  },
});

// 独立运行时，直接挂载应用
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
