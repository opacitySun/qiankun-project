<template>
  <div>
    <div class="example-list clearfix">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item._id)"
      >
        <div class="img">
          <img :src="item.imgSrc" />
        </div>
        <div class="text">
          <p class="title" :title="item.title">{{item.title}}</p>
          <p class="time">{{item.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getExamples } from '@/api/example';

@Component
export default class ExampleList extends Vue {
  list: any = [];

  mounted() {
    this.getList();
  }

  async getList() {
    const list = await getExamples({});
    this.list = list;
  }

  goDetail(id: any) {
    this.$router.push({
      path: `/example/detail`,
      query: {
        id: id
      }
    });
  }
}
</script>