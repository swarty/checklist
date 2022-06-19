interface ITaskAdditionData {
  title: string
  link: string
}

interface ITaskTitle {
  prefix: string
  description: string
}

export interface ITaskPayload {
  group: string
  priority: number
  title: ITaskTitle
  tags: string[]
  additionData: ITaskAdditionData
}

export interface ITask extends ITaskPayload {
  completed: boolean
  id: string
}

export interface IGroupedTaskList {
  [groupName: string]: ITask[]
}
