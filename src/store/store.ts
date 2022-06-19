import { defineStore } from 'pinia';
import {
  ITask,
  ITaskPayload,
  IGroupedTaskList,
} from '@/types/task';

export default defineStore('useMainStore', {
  state: () => ({
    taskList: [] as ITask[],
  }),
  actions: {
    toggleTaskCompletedStatus(id: string) {
      const findedTask = this.taskList.find((task) => task.id === id)!;
      findedTask.completed = !findedTask.completed;
    },
    async getTaskList() {
      const taskList = await fetch('/api/task-list.json').then((response) => response.json());
      this.taskList = taskList.map((task: ITaskPayload) => ({
        ...task,
        id: window.crypto.randomUUID(),
        completed: false,
      })) as ITask[];
    },
  },
  getters: {
    getGroupedTaskList(): IGroupedTaskList {
      return this.taskList.reduce((accum: IGroupedTaskList, next: ITask): IGroupedTaskList => {
        if (accum[next.group]) {
          accum[next.group].push(next);
        } else {
          accum[next.group] = [
            next,
          ];
        }
        return accum;
      }, {} as IGroupedTaskList);
    },
  },
});
