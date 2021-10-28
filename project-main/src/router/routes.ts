import { RouteConfig } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Example from "@/views/Example/index.vue";
import ExampleDetail from "@/views/Example/components/ExampleDetail.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: { name: 'exampleList' }
  },
  {
    path: "/example",
    component: Layout,
    children: [
      {
        name: "exampleList",
        path: 'list',
        component: Example
      },
      {
        name: "exampleDetail",
        path: "detail",
        component: ExampleDetail
      }
    ]
  },
  {
    path: "/micro",
    component: Layout,
    children: [
      {
        path: 'vue3'
      },
      {
        path: 'react'
      },
      {
        path: 'angular2'
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

export default routes;