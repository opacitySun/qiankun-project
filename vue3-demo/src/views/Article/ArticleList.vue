<template>
  <div class="articleList">
    <div 
      class="item"
      v-for="(item, index) in list" 
      :key="index"
    >
      <div class="box">
        <h6>{{item.title}}</h6>
        <p class="time">{{item.time}}</p>
        <p class="desc">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  toRefs
} from 'vue';
import { getArticleList } from '@src/api/article';
import { UtilsService } from '@src/utils/utils';

type PageState = {
  list: any
}

type ListItem = {
  _id: string;
  title: string;
  desc: string;
  article: string;
  time: number;
}

export default defineComponent({
  name: 'ArticleList',
  setup() {
    const utils = new UtilsService();
    
    let state = reactive<PageState>({
      list: []
    });

    const getList = async () => {
      const data:any = await getArticleList({});
      state.list = data.map((item: ListItem) => {
        item.time = utils.dateToStringFormat(new Date(item.time));
        return item;
      });
    };

    onBeforeMount(() => {
      getList();
    });

    onMounted(() => {
      
    });

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>