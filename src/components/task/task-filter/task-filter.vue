<template>
  <div class="cc-task-filter">
    <p
      class="cc-task-filter__title"
      v-text="translationMap.page.overview.taskFilter.title"
    />
    <div class="cc-task-filter__list">
      <button
        class="cc-task-filter__list-item cc-tag cc-tag_medium"
        :class="{
          'cc-task-filter__list-item_selected': store.activeTaskListTag === '',
        }"
        v-text="translationMap.page.overview.taskFilter.resetTag"
        @click="setActiveTag('')"
      />
      <button
        v-for="tag in store.getTagList"
        :key="tag"
        class="cc-task-filter__list-item cc-tag cc-tag_medium"
        :class="{
          'cc-task-filter__list-item_selected': store.activeTaskListTag === tag,
        }"
        v-text="tag"
        @click="setActiveTag(tag)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
} from 'vue';
import useMainStore from '@/store/store';

export default defineComponent({
  name: 'cc-task-filter',
});
</script>

<script setup lang="ts">
// eslint-disable-next-line
const translationMap = inject('$t') as any;
const store = useMainStore();
const setActiveTag = (tag: string) => {
  store.setActiveTaskListTag(tag);
};
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/tag.scss';
  @import '@/assets/style/components/typography.scss';
  @import './task-filter.scss';
</style>
