<template>
  <div class="cc-task">
    <div class="cc-task__row">
      <div
        class="cc-task__priority cc-text-1 cc-priority-dot"
        :class="{
          'cc-priority-dot_hight': task.priority === 1,
          'cc-priority-dot_medium': task.priority === 2,
          'cc-priority-dot_low': task.priority === 3,
        }"
      />
      <label
        class="cc-task__title cc-text-1"
        :class="{
          'cc-task__title_completed': completedStatus,
        }"
        @click.prevent="toggleTaskCompleteStatus"
      >
      <div class="cc-task__title-checkbox" />
      <span
        v-if="task.title.prefix"
        class="cc-task__title-prefix"
      >
        {{ task.title.prefix }}:
      </span>
      {{ task.title.description }}
      </label>
      <button
        v-if="!completedStatus"
        class="cc-task__toggler"
        @click="showBodyPart = !showBodyPart;"
        :disabled="!Boolean(task.additionData && task.additionData.length)"
       >
        <img
          class="cc-task__toggler-image"
          :src="dropdownIcon"
          alt="drop down icon"
         >
      </button>
    </div>
    <div
      v-if="!completedStatus"
      class="cc-task__row"
    >
      <div class="cc-task__tag-list">
        <span
          v-for="tag in task.tags"
          :key="tag"
          class="cc-task__tag-list-item cc-tag cc-tag_small"
          v-text="tag"
         />
      </div>
    </div>
    <div
      v-if="isVisibleBodyPart"
      class="cc-task__row"
     >
      <div class="cc-task__addition-data">
        <p
          v-text="translationMap.page.overview.taskList.task.additionDataTitle"
          class="cc-task__addition-data-title cc-text-2"
        />
        <ul class="cc-task__addition-data-list">
          <li
            v-for="data in task.additionData"
            :key="data.title"
            class="cc-task__addition-data-list-item"
          >
            <a
              class="cc-link cc-text-2"
              :href="data.link"
              rel="nofollow noreferrer"
             >
               <img
                  class="cc-task__addition-data-list-item-logo"
                  :src="composeIconLink(data.link)"
                  alt="domain image"
               >
               {{ data.title }}
             </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  inject,
} from 'vue';
import {
  ITask,
} from '@/types/task';
import useMainStore from '@/store/store';
import dropdownIcon from '@/assets/image/down-arrow.svg';

export default defineComponent({
  data: () => ({
    dropdownIcon,
  }),
});
</script>

<script setup lang="ts">
// eslint-disable-next-line
const translationMap = inject('$t') as any;
const propMap = defineProps<{
  task: ITask,
  completed: boolean,
  expanded: boolean,
}>();
const store = useMainStore();
const toggleTaskCompleteStatus = () => {
  if (propMap.completed) {
    return;
  }
  store.toggleTaskCompletedStatus(propMap.task.id);
};
const completedStatus = computed(() => propMap.task.completed);

const showBodyPart = ref(false);
const isVisibleBodyPart = computed(() => (showBodyPart.value || propMap.expanded) && !propMap.task.completed && propMap.task.additionData?.length);
// const isVisibleBodyPart = computed(() => !completedStatus.value && showBodyPart.value && propMap.task.additionData && propMap.task.additionData.length);

const composeIconLink = (link: string): string => `https://www.google.com/s2/favicons?domain_url=${link}`;
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/tag.scss';
  @import '@/assets/style/components/priority-dot.scss';
  @import '@/assets/style/components/typography.scss';
  @import './task.scss';
</style>
