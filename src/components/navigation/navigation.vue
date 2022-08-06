<template>
  <nav
    class="cc-navigation"
    :class="{
      'cc-navigation_visible': isVisible,
    }"
  >
    <div class="cc-navigation__container">
      <a
        v-for="item in navigationList"
        :key="item"
        class="cc-navigation__item cc-tag cc-tag_white"
        v-text="item"
        :href="`#${item}`"
        @click.prevent="smoothScroll(item)"
       />
     </div>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
} from 'vue';
import useMainStore from '@/store/store';
import smoothScroll from '@/util/smooth-scroll';

export default defineComponent({
  name: 'cc-navigation',
});
</script>

<script lang="ts" setup>
const store = useMainStore();
const navigationList = computed(() => Object
  .keys(store.getGroupedTaskList)
  .map((item) => item.split(' ').join('-')));
withDefaults(defineProps<{
  isVisible: boolean,
}>(), {
  isVisible: false,
});

// const isVisibleFlag = ref(isVisible);
</script>

<style lang="scss">
  @import '@/assets/style/components/tag.scss';
  @import './navigation.scss';
</style>
