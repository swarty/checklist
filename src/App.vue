<template>
  <div class="cc-app">
    <div class="cc-app__wrapper">
      <div class="cc-container cc-app__container">
        <div ref="introHeader">
          <CcIntroHeader/>
        </div>
        <Suspense>
          <CcTaskContainer />
        </Suspense>
        <CcNavigation :is-visible="showNavigation" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import CcIntroHeader from './components/intro-header/intro-header.vue';
import CcTaskContainer from './components/task/task-container/task-container.vue';
import CcNavigation from './components/navigation/navigation.vue';

export default {
  components: {
    CcIntroHeader,
    CcTaskContainer,
    CcNavigation,
  },
};
</script>

<script lang="ts" setup>
const introHeader = ref(null);
const showNavigation = ref(false);
function intersectionObserverCallback(entry: IntersectionObserverEntry[]) {
  showNavigation.value = !entry[0].isIntersecting;
}

const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
});

onMounted(() => {
  intersectionObserver.observe(introHeader.value as unknown as Element);
});

onBeforeUnmount(() => {
  intersectionObserver.disconnect();
});
</script>

<style lang="scss">
  @use '@/assets/style/config/media.scss';
  @use '@/assets/style/app.scss';
  @use '@/assets/style/components/container.scss';

  .cc-app {
    &__wrapper {
      min-height: 100vh;
      display: grid;
      grid-template-columns: repeat(1, auto);
      margin: 75px auto 100px;
      @include media.media(phone) {
        margin: 35px auto 50px;
        margin: 0;
      }
      @include media.print() {
        margin: 0;
      }
    }
    &__container {
       position: relative;
       @include media.media(phone) {
        padding: 0;
       }
    }
  }
</style>
