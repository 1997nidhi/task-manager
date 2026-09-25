import type { ChangeEvent } from "react";
import type { TaskPriority } from "../types";

type TaskToolbarProps = {
  filterPriority: TaskPriority | "";
  isSorted: boolean;
  onFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
  onToggleSort: () => void;
};

export function TaskToolbar({
  filterPriority,
  isSorted,
  onFilter,
  onToggleSort,
}: TaskToolbarProps) {
  return (
    <div className="task-header">
      <h2>Tasks:</h2>
      <div className="task-filter">
        <label htmlFor="priority-filter">Filter by priority</label>
        <select id="priority-filter" value={filterPriority} onChange={onFilter}>
          <option value="">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button type="button" onClick={onToggleSort}>
        {isSorted ? "Show original order" : "Sort by date"}
      </button>
    </div>
  );
}
