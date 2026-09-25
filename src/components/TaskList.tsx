import type { Task } from "../types";
import { groupTasksByStatus, sortTasksByDate } from "../utils/taskUtils";

type TaskListProps = {
  tasks: Task[];
  filteredTasks: Task[];
  isFilterActive: boolean;
  isSorted: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

function TaskItem({
  task,
  onDelete,
  onEdit,
}: {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <li>
      <p>Id: {task.id}</p>
      <span>Title: {task.title}</span>
      <span>Description: {task.description}</span>
      <p>
        <span>Status: {task.status}</span>
        <span>Priority: {task.priority}</span>
        <span>DueDate: {task.dueDate}</span>
      </p>
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
      <button type="button" onClick={() => onEdit(task.id)}>
        Edit
      </button>
    </li>
  );
}

export function TaskList({
  tasks,
  filteredTasks,
  isFilterActive,
  isSorted,
  onDelete,
  onEdit,
}: TaskListProps) {
  const visibleTasks = isFilterActive ? filteredTasks : tasks;
  const shouldRenderFlatList = isFilterActive || isSorted;
  const sortedVisibleTasks = isSorted
    ? sortTasksByDate(visibleTasks)
    : visibleTasks;

  const renderTask = (task: Task) => (
    <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
  );

  if (shouldRenderFlatList) {
    return <ul className="task-list">{sortedVisibleTasks.map(renderTask)}</ul>;
  }

  const groups = groupTasksByStatus(tasks);

  return (
    <ul className="task-list">
      {groups.map((group) => (
        <li className="task-group" key={group.title}>
          <h3>{group.title}</h3>
          <ul className="task-sublist">{group.tasks.map(renderTask)}</ul>
          <hr />
        </li>
      ))}
    </ul>
  );
}
