import type { ChangeEvent, FormEvent } from "react";
import type { TaskFormData } from "../types";

type TaskFormProps = {
  formData: TaskFormData;
  isEditing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TaskForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={onChange}
          disabled={isEditing}
        />
      </div>
      <div className="form-field">
        <label htmlFor="task-description">Description</label>
        <input
          id="task-description"
          type="text"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={onChange}
          disabled={isEditing}
        />
      </div>
      <div className="form-field">
        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          name="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          name="priority"
          value={formData.priority}
          onChange={onChange}
          disabled={isEditing}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="task-due-date">Due date</label>
        <input
          id="task-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={onChange}
          disabled={isEditing}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
