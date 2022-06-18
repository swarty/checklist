import { defineStore } from 'pinia';

export default defineStore('useMainStore', {
  state: () => ({
    taskList: [] as any[],
  }),
  actions: {
    async getTeaskList() {
      const taskList = await fetch('/api/task-list.json').then((response) => response.json());
      console.log('api response', taskList);
      // this.taskList = taskList;
    },
  },
});
