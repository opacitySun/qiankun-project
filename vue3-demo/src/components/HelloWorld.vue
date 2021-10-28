<template>
  <h1>{{ msg }}</h1>

  <!-- <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p> -->

  <button type="button" @click="inCrement">count is: {{ count }}</button>
  <!-- <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

// defineProps<{ msg: string }>()

// const count = ref(0)

import { defineComponent, defineProps, computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import { key } from '@src/store';

// export default defineComponent({
//   name: 'HelloWorld',
//   setup(props, context) {
//     const store = useStore(key);
//     const count = computed(() => {
//       return store.state.count;
//     });

//     return {
//       ...toRefs(props),
//       count,
//       inCrement: () => {
//         store.commit('increment');
//       }
//     };
//   }
// });

type Props = {
  msg: string
}

defineProps<Props>();
const store = useStore(key);
const count = computed(() => {
  return store.state.count;
});
const inCrement = () => {
  store.commit('increment');
};

</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
