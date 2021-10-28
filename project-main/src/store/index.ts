import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

interface Modules {
  [key: string]: any
}

const modulesFiles = require.context("./modules", true, /\.ts$/);
const modules = modulesFiles.keys().reduce((modules: Modules, modulePath) => {
  const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value: any = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {})

export default new Vuex.Store({
  strict: process.env.NODE_ENV === "development"? true : false,
  state: {},
  mutations: {},
  actions: {},
  modules: modules || {},
  getters
});
