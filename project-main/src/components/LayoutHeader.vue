<template>
  <div>
    <div class="banner"></div>
    <div class="nav">
      <div class="nav-btn" @click="navListVisible = !navListVisible">
        <div class="square"></div>
        <div class="square animate"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
      <div :class="{'nav-list': true, 'visible': navListVisible}">
        <div 
          :class="{'item': true, 'active': item.active}"
          v-for="(item, index) in navList" 
          :key="index"
          @click="goModulePath(item)"
        >
          <div :class="['icon', item.icon]"></div>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LayoutHeader extends Vue {
  navListVisible: boolean = false;
  navList: any = [
    { 
      id: 0, 
      name: '示例', 
      path: '/', 
      icon: 'icon-example', 
      active: true 
    },
    { 
      id: 1, 
      name: '文章', 
      path: '/micro/vue3', 
      icon: 'icon-article', 
      active: false 
    },
    { 
      id: 2, 
      name: '企划', 
      path: '/micro/react', 
      icon: 'icon-plan', 
      active: false 
    },
    { 
      id: 3, 
      name: '精灵', 
      path: '/micro/angular2', 
      icon: 'icon-spirits', 
      active: false 
    }
  ];

  created() {
    const { pathname } = window.location;
    this.navList = this.navList.map((itm: any) => {
      let { path } = itm;
      if(path === '/') path = '/example';
      if(pathname.indexOf(path) > -1) {
        itm.active = true;
      }else{
        itm.active = false;
      }
      return itm;
    });
  }
  
  //跳转到模块地址
  goModulePath(item: any) {
    const { pathname } = window.location;
    const { path, id } = item;
    let isActivePath = false;
    this.navList.forEach((itm: any) => {
      if(itm.active && itm.path === path) {
        if(pathname.indexOf(itm.path) > -1) isActivePath = true;
      }
    });
    if(isActivePath) return;
    this.navList = this.navList.map((itm: any) => {
      if(id === itm.id) {
        itm.active = true;
      }else{
        itm.active = false;
      }
      return itm;
    });
    this.$router.push({ path: path });
  }
}
</script>