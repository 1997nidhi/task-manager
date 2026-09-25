import type { Task, TaskPriority, TaskStatus } from "../types";

export const filterTasksByPriority = (
  tasks: Task[],
  priority: TaskPriority | "",
): Task[] =>
  priority === "" ? tasks : tasks.filter((task) => task.priority === priority);

export const sortTasksByDate = (tasks: Task[]): Task[] =>
  [...tasks].sort((a, b) => b.dueDate.localeCompare(a.dueDate));

export const groupTasksByStatus = (tasks: Task[]) => {
  const groups: Record<TaskStatus, Task[]> = {
    pending: [],
    inProgress: [],
    completed: [],
  };

  for (const task of tasks) {
    groups[task.status].push(task);
  }

  return [
    { title: "Pending", tasks: groups.pending },
    { title: "InProgress", tasks: groups.inProgress },
    { title: "Completed", tasks: groups.completed },
  ];
};
