<template>
  <div>
    hello world {{ data }}
    <button @click="increeseData">
      increese data
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue';

export default defineComponent({
  name: 'cc-header',
});
</script>

<script lang="ts" setup>
const data = ref(0);

function increeseData () {
  data.value += 1;
}
</script>
