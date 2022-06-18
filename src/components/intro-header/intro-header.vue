<template>
  <header class="cc-intro-header">
    <div class="cc-container">
      <div class="cc-intro-header__container">
        <div class="cc-intro-header__header">
          <h1 class="cc-intro-header__title cc-intro-header-1">
            Check list application
          </h1>
          <p class="cc-intro-header__subtitle">
            Application with help whitch you can made checklist for any goals and follow by this.
          </p>
        </div>
        <div class="cc-intro-header__body">
          <CcProjectForm />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import CcProjectForm from '@/components/project-form/project-form.vue';

export default defineComponent({
  name: 'cc-intro-header',
  components: {
    CcProjectForm,
  },
});
</script>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/container.scss';
  @import '@/assets/style/components/typography.scss';
  @import './intro-header.scss';
</style>
