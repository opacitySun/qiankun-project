<template>
  <div class="example clearfix">
    <ExampleList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExampleList from "./components/ExampleList.vue"; // @ is an alias to /src

@Component({
  components: {
    ExampleList
  },
})
export default class Example extends Vue {}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>