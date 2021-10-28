import TestOne from '@src/views/TestOne.vue';
import TestTwo from '@src/views/TestTwo.vue';
import ArticleList from '@src/views/Article/ArticleList.vue';

export default [
  { 
    path: '/', 
    component: ArticleList
  },
  { 
    path: '/home', 
    component: () => import('@src/views/Home.vue') 
  },
  { 
    path: '/testOne', 
    component: TestOne
  },
  { 
    path: '/testTwo', 
    component: TestTwo
  },
];