<template>
  <div class="cc-task-container">
    <CcTaskFilter class="cc-task-container__filter" />
    <CcTaskList
      class="cc-task-container__list"
      :grouped-task-list="store.getGroupedTaskList"
    />
  </div>
</template>

<script lang="ts">
import useMainStore from '@/store/store';
import CcTaskFilter from '@/components/task/task-filter/task-filter.vue';
import CcTaskList from '@/components/task/task-list/task-list.vue';

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
await store.getTaskList();
</script>

<style lang="scss" scoped>
  @import './task-container.scss';
</style>
