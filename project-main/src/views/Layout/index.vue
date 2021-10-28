<template>
  <div class="layout">
    <div class="layout-content">
      <div class="layout-aside">
        <LayoutHeader />
      </div>
      <div class="layout-main">
        <!--主应用渲染区-->
        <router-view v-show="$route.name" />
        <!--子应用渲染区-->
        <section v-show="!$route.name" id="frame" class="micro-app"></section>
      </div>
    </div>
    <div class="layout-footer">
      <p>孙博为个人博客</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import startQiankun from "@/micro";
import LayoutHeader from "@/components/LayoutHeader.vue"; // @ is an alias to /src

@Component({
  components: {
    LayoutHeader
  },
})

export default class Layout extends Vue {
  mounted() {
    startQiankun();
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>