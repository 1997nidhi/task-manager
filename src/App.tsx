import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskToolbar } from "./components/TaskToolbar";
import type { Task, TaskFormData, TaskPriority } from "./types";
import { filterTasksByPriority } from "./utils/taskUtils";

const createTask = (formData: TaskFormData): Task => ({
  ...formData,
  id: Date.now(),
});

const updateTask = (tasks: Task[], formData: TaskFormData): Task[] => {
  if (formData.id === "") return tasks;

  return tasks.map((task) =>
    task.id === formData.id ? { ...formData, id: task.id } : task,
  );
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState<TaskFormData>({
    id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });
  const [isSorted, setIsSorted] = useState(false);

  const [filterPriority, setFilterPriority] = useState<TaskPriority | "">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearFormData = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.dueDate.trim()
    ) {
      return;
    }

    setTasks((prev) =>
      formData.id === ""
        ? [...prev, createTask(formData)]
        : updateTask(prev, formData),
    );
    clearFormData();
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    setFormData({ ...taskToEdit });
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as TaskPriority | "";
    setFilterPriority(priority);
  };

  const filteredTasks = filterTasksByPriority(tasks, filterPriority);
  const isReadOnly = formData.id !== "";

  return (
    <div className="container">
      <h1>Task Management System</h1>

      <TaskForm
        formData={formData}
        isEditing={isReadOnly}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <hr />
      <div>
        <TaskToolbar
          filterPriority={filterPriority}
          isSorted={isSorted}
          onFilter={handleFilter}
          onToggleSort={() => setIsSorted((prev) => !prev)}
        />
        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          isFilterActive={filterPriority !== ""}
          isSorted={isSorted}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
