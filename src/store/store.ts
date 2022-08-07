import { defineStore } from 'pinia';
import {
  ITask,
  ITaskPayload,
  IGroupedTaskList,
} from '@/types/task';

export default defineStore('useMainStore', {
  state: () => ({
    taskList: [] as ITask[],
    activeTaskListTag: '',
  }),
  actions: {
    enableTaskCompletedStatus(id: string) {
      const findedTask = this.taskList.find((task) => task.id === id)!;
      findedTask.completed = true;
    },
    disableTaskCompletedStatus(id: string) {
      const findedTask = this.taskList.find((task) => task.id === id)!;
      findedTask.completed = false;
    },
    toggleTaskCompletedStatus(id: string) {
      const findedTask = this.taskList.find((task) => task.id === id)!;
      findedTask.completed = !findedTask.completed;
    },
    setActiveTaskListTag(tag: string) {
      this.activeTaskListTag = tag;
    },
    async getTaskList() {
      const response = await fetch('./api/task-list.json');
      const taskList = await response.json();
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
    getTagList(): string[] {
      return Array.from(
        new Set(
          this.taskList
            .map((task: ITask) => task.tags)
            .flat(),
        ),
      );
    },
  },
});
