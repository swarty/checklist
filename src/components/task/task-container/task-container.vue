<template>
  <div class="cc-task-container">
    <CcTaskFilter class="cc-task-container__filter" />
    <CcTaskList class="cc-task-container__list" />
  </div>
</template>

<script lang="ts">
import CcTaskFilter from '@/components/task/task-filter/task-filter.vue';
import CcTaskList from '@/components/task/task-list/task-list.vue';
import useMainStore from '@/store/store';

export default {
  name: 'cc-task-container',
  components: {
    CcTaskFilter,
    CcTaskList,
  },
};
</script>

<script setup lang="ts">
const store = useMainStore();
await store.getTeaskList();
</script>

<style lang="scss" scoped>
  @import './task-container.scss';
</style>
