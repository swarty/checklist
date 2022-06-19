<template>
  <div class="cc-wrapper">
    <div class="cc-container">
      <CcIntroHeader />
      <Suspense>
        <CcTaskContainer />
      </Suspense>
    </div>
  </div>
</template>

<script>
import CcIntroHeader from './components/intro-header/intro-header.vue';
import CcTaskContainer from './components/task/task-container/task-container.vue';

export default {
  components: {
    CcIntroHeader,
    CcTaskContainer,
  },
};
</script>

<style lang="scss">
  @import '@/assets/style/app.scss';
  @import '@/assets/style/components/container.scss';

  .cc-wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(1, auto);
  }
</style>
