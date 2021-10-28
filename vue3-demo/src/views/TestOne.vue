<template>
  <ul>
    <li v-for="(item, index) in testList" :key="index">{{item.name}}</li>
  </ul>
</template>

<script lang="ts">
import { 
  defineComponent
} from 'vue';

export default defineComponent({
  name: 'TestOne',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      testList: [
        {name: '列表一'},
        {name: '列表二'},
        {name: '列表三'},
      ]
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  mothods: {

  }
});
</script>