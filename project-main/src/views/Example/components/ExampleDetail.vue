<template>
  <div>
    <pre class="code">{{code}}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getExampleById } from '@/api/example';

@Component
export default class ExampleDetail extends Vue{
  code: string = `
    var a = 0;
    console.log(a);
  `;

  created() {
    this.getData();
  }

  getData() {
    const id: any = this.$route.query.id;
    getExampleById({id: id}).then(res => {
      console.log(res);
    })
  }
}
</script>