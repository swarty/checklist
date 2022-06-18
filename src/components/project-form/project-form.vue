<template>
  <div class="cc-project-form">
    <form
      class="cc-project-form__form cc-form"
      @submit.prevent="onSubmit"
    >
      <div class="cc-project-form__form-row">
        <label class="cc-form__label">
          <input
            type="text"
            class="cc-form__input"
            v-model="projectName"
            :placeholder="translationMap.component.projectForm.projectName.placeholder"
          >
        </label>
      </div>

       <div class="cc-project-form__form-row">
        <label class="cc-form__label">
          <input
            type="text"
            class="cc-form__input"
            v-model="projectLink"
            placeholder="Project LOT|Design|Website link"
          >
        </label>
      </div>

      <div class="cc-project-form__form-row">
        <label class="cc-form__label">
          <input
            type="text"
            class="cc-form__input"
            v-model="employeeName"
            placeholder=""
          >
        </label>
      </div>
      <div class="cc-project-form__form-row">
        <button type="submit">
          submit form
        </button>
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
const translationMap = inject('$t') as any;
const projectName = ref('');
const projectLink = ref('');
const employeeName = ref('');

function onSubmit() {
  console.log('on submit');
}
</script>
