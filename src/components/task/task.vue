<template>
  <div class="cc-task">
    <div class="cc-task__header cc-title-3">
      <p class="cc-task__header-title">
        <span class="cc-task__header-title-prefix">
          {{ task.title.prefix }}:
        </span>
        {{ task.title.description }}
      </p>
    </div>
    <button @click="toggleTaskCompleteStatus">
      update + 1
    </button>
  </div>
</template>

<script lang="ts">
import {
  ITask,
} from '@/types/task';
import useMainStore from '@/store/store';
</script>

<script setup lang="ts">
const propMap = defineProps<{
  task: ITask
}>();
const store = useMainStore();

const toggleTaskCompleteStatus = () => {
  store.toggleTaskCompletedStatus(propMap.task.id);
};
</script>

<style lang="scss" scoped>
  @import './task.scss';
</style>
