<template>
  <div class="cc-project-form">
    <form
      class="cc-project-form__form cc-form"
      @submit.prevent
    >
      <div class="cc-project-form__form-row">
        <label class="cc-form__label cc-project-form__form-label">
          <input
            type="text"
            class="cc-form__input cc-project-form__form-input"
            v-model="projectName"
            :placeholder="translationMap.component.projectForm.projectName.placeholder"
          >
        </label>
      </div>

       <div class="cc-project-form__form-row">
        <label class="cc-form__label cc-project-form__form-label">
          <input
            type="text"
            class="cc-form__input cc-project-form__form-input"
            v-model="projectLink"
            :placeholder="translationMap.component.projectForm.projectLink.placeholder"
          >
        </label>
      </div>

      <div class="cc-project-form__form-row">
        <label class="cc-form__label cc-project-form__form-label">
          <input
            type="text"
            class="cc-form__input cc-project-form__form-input"
            v-model="employeeName"
            :placeholder="translationMap.component.projectForm.employeeName.placeholder"
          >
        </label>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
} from 'vue';

export default defineComponent({
  name: 'cc-project-form',
});
</script>

<script setup lang="ts">
// eslint-disable-next-line
const translationMap = inject('$t') as any;
const projectName = ref('');
const projectLink = ref('');
const employeeName = ref('');
</script>

<style lang="scss" scoped>
  @import '@/assets/style/components/form.scss';
  @import './project-form.scss';
</style>
