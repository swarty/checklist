<template>
  <header class="cc-intro-header">
    <div class="cc-intro-header__container">
      <div class="cc-intro-header__header">
        <h1 class="cc-intro-header__title cc-title-1">
          {{ translationMap.page.overview.introHeader.title }}
        </h1>
        <p class="cc-intro-header__subtitle cc-text-1">
          {{ translationMap.page.overview.introHeader.subtitle }}
        </p>
      </div>
      <div class="cc-intro-header__body">
        <div class="cc-intro-header__form">
          <CcProjectForm />
        </div>
        <div class="cc-intro-header__priority-report">
          <p
            class="cc-intro-header__priority-report-title"
            v-text="translationMap.page.overview.introHeader.priority.title"
          />
          <ul class="cc-intro-header__priority-report-list">
            <li
              v-for="priority in priorityArray"
              :key="priority.key"
              class="cc-intro-header__priority-report-list-item cc-text-2"
            >
              <span
                class="cc-priority-dot cc-intro-header__priority-report-list-item-dot"
                :class="{
                  'cc-priority-dot_hight': priority.key === HIGHT_PRIORITY,
                  'cc-priority-dot_medium': priority.key === MEDIUM_PRIORITY,
                  'cc-priority-dot_low': priority.key === LOW_PRIORITY,
                }"
              />
              {{ priority.completed.value.length }}
              /
              {{ priority.total.value.length }}
              <span
                v-if="priority.key === HIGHT_PRIORITY"
                class="cc-intro-header__priority-report-list-item-type"
                v-text="translationMap.page.overview.introHeader.priority.hight"
               />
              <span
                v-if="priority.key === MEDIUM_PRIORITY"
                class="cc-intro-header__priority-report-list-item-type"
                v-text="translationMap.page.overview.introHeader.priority.medium"
              />
              <span
                v-if="priority.key === LOW_PRIORITY"
                class="cc-intro-header__priority-report-list-item-type"
                v-text="translationMap.page.overview.introHeader.priority.low"
              />
            </li>
          </ul>
        </div>
        <nav class="cc-intro-header__navigation">
          <a
            v-for="item in navigationList"
            :key="item"
            :href="`#${item.split(' ').join('-')}`"
            class="cc-intro-header__navigation-item cc-tag"
            @click.prevent="smoothScroll(item.split(' ').join('-'))"
            v-text="item"
          />

          <button
            type="button"
            class="cc-intro-header__navigation-print-button cc-text-2"
            @click="printPage"
          >
            {{ translationMap.page.overview.introHeader.printButton }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
} from 'vue';
import CcProjectForm from '@/components/project-form/project-form.vue';
import useMainStore from '@/store/store';
import { ITask } from '@/types/task';
import smoothScroll from '@/util/smooth-scroll';

export default defineComponent({
  name: 'cc-intro-header',
  components: {
    CcProjectForm,
  },
});
</script>

<script lang="ts" setup>
// eslint-disable-next-line
const translationMap = inject('$t') as any;

const HIGHT_PRIORITY = 1;
const MEDIUM_PRIORITY = 2;
const LOW_PRIORITY = 3;

const store = useMainStore();
const hightPriorityTaskCount = computed(() => store.taskList.filter((task: ITask) => task.priority === HIGHT_PRIORITY) || []);
const hightPriorityTaskCompletedCount = computed(() => hightPriorityTaskCount.value.filter((task: ITask) => task.completed));

const mediumPriorityTaskCount = computed(() => store.taskList.filter((task: ITask) => task.priority === MEDIUM_PRIORITY));
const mediumPriorityTaskCompletedCount = computed(() => mediumPriorityTaskCount.value.filter((task: ITask) => task.completed));

const lowPriorityTaskCount = computed(() => store.taskList.filter((task: ITask) => task.priority === LOW_PRIORITY));
const lowPriorityTaskCompletedCount = computed(() => lowPriorityTaskCount.value.filter((task: ITask) => task.completed));

const priorityArray = [
  {
    key: HIGHT_PRIORITY,
    total: hightPriorityTaskCount,
    completed: hightPriorityTaskCompletedCount,
  },
  {
    key: MEDIUM_PRIORITY,
    total: mediumPriorityTaskCount,
    completed: mediumPriorityTaskCompletedCount,
  },
  {
    key: LOW_PRIORITY,
    total: lowPriorityTaskCount,
    completed: lowPriorityTaskCompletedCount,
  },
];
const navigationList = computed(() => Object
  .keys(store.getGroupedTaskList)
  .map((item) => item.split(' ').join('-')));

const printPage = () => {
  window.print();
};
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/priority-dot.scss';
  @import '@/assets/style/components/tag.scss';
  @import '@/assets/style/components/typography.scss';
  @import './intro-header.scss';
</style>
