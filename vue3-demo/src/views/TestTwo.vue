<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{item.title}}</li>
  </ul>
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

type PageState = {
  list: any
}

export default defineComponent({
  name: 'TestTwo',
  setup() {
    let state = reactive<PageState>({
      list: []
    });

    const getList = async () => {
      const data = await getArticleList({});
      state.list = data;
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