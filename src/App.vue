<template>
  <div class="cc-wrapper">
    <CcIntroHeader />
  </div>
</template>

<script setup>
import CcIntroHeader from './components/intro-header/intro-header.vue';
</script>

<style lang="scss">
  @import '@/assets/style/app.scss';

  .cc-wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(1, auto);
  }
</style>
