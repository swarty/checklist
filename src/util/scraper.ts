// util function to help get data from vebsite to avoid fingerprinting
/* eslint-disable */
export interface ITaskAdditionData {
  title: string
  link: string
}

interface ITaskTitle {
  prefix?: string
  description: string
}

interface ITask {
  group: string
  priority: number
  title: ITaskTitle
  tags: string[]
  additionData?: ITaskAdditionData[]
}

enum EPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
/* eslint-enable */

function scraper () {
  const sectionList: NodeListOf<HTMLElement> = document.querySelectorAll('[data-section');
  const elementList: ITask[] = [];

  sectionList.forEach((section) => {
    const group: string = section.dataset.section!;

    const listItem: NodeListOf<HTMLElement> = section.querySelectorAll('[data-item-id]');
    listItem.forEach((task) => {
      let priority = 3;
      if (task.dataset.itemPriority === EPriority.HIGH) {
        priority = 1;
      } else if (task.dataset.itemPriority === EPriority.MEDIUM) {
        priority = 2;
      }
      const title: ITaskTitle = {
        description: task.querySelector('.label__description')!.textContent!.replaceAll('"', '\''),
      };
      if (task.querySelector('.label__title')) {
        title.prefix = task.querySelector('.label__title')!.textContent as string;
      }
      const tags: string[] = Array.from(task.querySelectorAll('.c-tags__item')).map((tag) => tag.textContent!);
      const additionData: ITaskAdditionData[] = Array.from(task.querySelectorAll('.documentation__list li')).map((listItem) => {
        const tag = listItem.querySelector('a')!;
        const title = tag.textContent!.replaceAll('"', '\'') as string;
        const link = tag.href;
        return {
          title,
          link,
        };
      });

      elementList.push({
        group,
        priority,
        title,
        tags,
        additionData,
      });
    });
  });

  return elementList;
}
