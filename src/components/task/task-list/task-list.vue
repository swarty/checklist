<template>
  <div class="cc-task-list">
    <div
      class="cc-task-list__section"
      v-for="(taskArray, taskGroup) in groupedTaskList"
      :key="taskGroup"
    >
      <div class="cc-task-list__section-header">
        <h2 class="cc-task-list__section-header-title cc-title-2">
          {{ taskGroup }}:
        </h2>
        <span class="cc-task-list__section-progress">
          {{ getSectionProgress(taskArray) }} / {{ taskArray.length }}
        </span>
      </div>
      <div class="cc-task-list__section-list">
        <CcTask
          class="cc-task-list__section-list-item"
          v-for="task in taskArray"
          :task="task"
          :key="task.title.prefix"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CcTask from '@/components/task/task.vue';
import {
  IGroupedTaskList, ITask,
} from '@/types/task';

export default {
  name: 'cc-task-list',
  components: {
    CcTask,
  },
};
</script>

<script lang="ts" setup>
interface IProps {
  groupedTaskList: IGroupedTaskList
}

withDefaults(defineProps<IProps>(), {
  groupedTaskList: () => ({}),
});

const getSectionProgress = (taskList: ITask[]): number => taskList.reduce((accum, next: ITask) => {
  accum += Number(next.completed);
  return accum;
}, 0);
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/typography.scss';
  @import './task-list.scss';
</style>
