import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * 第三方库
 */
import { Provider } from 'react-redux';
import _ from 'lodash';

/**
 * 自定义脚本
 */
import BasicRoute from '@src/routes';
import store from '@src/store/index';

/**
 * 样式
 */
import "@src/styles/common.scss";

function renderApp(props: any) {
  const { container } = props;
  const appEle = container? container.querySelector('#root') : document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <BasicRoute />
    </Provider>
    , appEle
  );
}

if((window as any).__POWERED_BY_QIANKUN__) {
  // 动态设置 webpack publicPath，防止资源加载出错
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if(!(window as any).__POWERED_BY_QIANKUN__) {
  renderApp({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("ReactMicroApp bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log("ReactMicroApp mount");
  renderApp(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  console.log("ReactMicroApp unmount");
  const { container } = props;
  const appEle = container? container.querySelector('#root') : document.getElementById('root');
  ReactDOM.unmountComponentAtNode(appEle);
}

if (module && module.hot) {
  module.hot.accept();
}