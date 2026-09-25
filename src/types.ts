export type TaskStatus = "pending" | "inProgress" | "completed";
export type TaskPriority = "high" | "medium" | "low";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

export type TaskFormData = Omit<Task, "id"> & { id: number | "" };
