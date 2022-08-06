<template>
  <div class="cc-task-group">
    <div class="cc-task-group__header">
      <h2 class="cc-task-group__header-title cc-title-1">
        {{ taskGroup }}:
      </h2>
      <div class="cc-task-group__header-progress">
        <p class="cc-task-group__header-progress-note">
          <span class="cc-task-group__header-progress-note-group">
            {{ taskGroup }}
          </span>
          {{ translationMap.page.overview.taskList.progress.completedStatusTitle }}
          {{ getSectionPercentageProgress(taskArray) }} / 100%
        </p>
        <progress
          class="cc-task-group__header-progress-tag"
          :value="getSectionProgress(taskArray)"
          :max="taskArray.length"
         />
      </div>
      <div class="cc-task-group__header-navigation">
        <button
          v-for="navigation in navigationList"
          :key="navigation.name"
          type="button"
          class="cc-task-group__header-navigation-item"
          @click="navigation.event"
        >
          <img
            :src="navigation.active.value
              ? navigation.firstIcon
              : navigation.secondIcon"
            :alt="navigation.name"
          >
        </button>
      </div>
    </div>
    <div
      v-show="visibleSection"
      class="cc-task-group__list"
     >
      <template
        v-for="task in taskArray"
        :key="task.title.prefix"
      >
        <CcTask
          v-if="task.tags.includes(store.activeTaskListTag) || store.activeTaskListTag === ''"
          class="cc-task-group__list-item"
          :task="task"
          :completed="taskChecked"
          :expanded="taskExpanded"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  inject,
  defineComponent,
  ref,
} from 'vue';
import {
  ITask,
} from '@/types/task';
import CcTask from '@/components/task/task.vue';
import useMainStore from '@/store/store';

// images
import CheckboxImage from '@/assets/image/checkbox.png';
import EmptyCheckboxImage from '@/assets/image/empty-checkbox.png';
import CollapseImage from '@/assets/image/collapse-two-arrows-diagonal-symbol.png';
import ExpandImage from '@/assets/image/expanding-two-opposite-arrows-diagonal-symbol-of-interface.png';
import VisibleImage from '@/assets/image/visible.png';
import UnvisibleImage from '@/assets/image/unvisible.png';

export default defineComponent({
  name: 'cc-task-group',
  components: {
    CcTask,
  },
});
</script>

<script lang="ts" setup>
const props = defineProps<{
  taskGroup: string,
  taskArray: ITask[],
}>();

// eslint-disable-next-line
const translationMap = inject('$t') as any;
const store = useMainStore();

const getSectionProgress = (taskList: ITask[]): number => taskList.reduce((accum, next: ITask) => {
  accum += Number(next.completed);
  return accum;
}, 0);
const getSectionPercentageProgress = (taskList: ITask[]) => getSectionProgress(taskList) * (100 / taskList.length);

const taskChecked = ref(false);
const taskExpanded = ref(false);
const visibleSection = ref(true);

const navigationList = [
  {
    name: 'check button',
    firstIcon: EmptyCheckboxImage,
    secondIcon: CheckboxImage,
    active: taskChecked,
    event: () => {
      taskChecked.value = !taskChecked.value;
      props.taskArray.forEach(({
        id,
      }) => {
        if (taskChecked.value) {
          store.enableTaskCompletedStatus(id);
        } else {
          store.disableTaskCompletedStatus(id);
        }
      });
    },
  },
  {
    name: 'collapse button',
    firstIcon: CollapseImage,
    secondIcon: ExpandImage,
    active: taskExpanded,
    event: () => {
      taskExpanded.value = !taskExpanded.value;
    },
  },
  {
    name: 'show visibility button',
    firstIcon: UnvisibleImage,
    secondIcon: VisibleImage,
    active: visibleSection,
    event: () => {
      visibleSection.value = !visibleSection.value;
    },
  },
];
</script>

<style lang="scss" scoped>
 @use '@/assets/style/components/typography.scss';
 @use './task-group.scss';
</style>
