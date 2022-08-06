<template>
  <div class="cc-task-list">
    <section
      v-for="(taskArray, taskGroup) in groupedTaskList"
      :id="(taskGroup as string).split(' ').join('-')"
      :key="taskGroup"
      class="cc-task-list__section"
    >
      <CcTaskGroup
        :task-group="(taskGroup as string)"
        :task-array="taskArray"
      />
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import CcTaskGroup from '@/components/task/task-group/task-group.vue';

import {
  IGroupedTaskList,
} from '@/types/task';

export default defineComponent({
  name: 'cc-task-list',
  components: {
    CcTaskGroup,
  },
});
</script>

<script lang="ts" setup>
interface IProps {
  groupedTaskList: IGroupedTaskList
}

withDefaults(defineProps<IProps>(), {
  groupedTaskList: () => ({}),
});
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/typography.scss';
  @import './task-list.scss';
</style>
