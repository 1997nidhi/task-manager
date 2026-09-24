import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

type TaskStatus = "pending" | "inProgress" | "completed";
type TaskPriority = "high" | "medium" | "low";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

type FormData = Omit<Task, "id"> & { id: number | "" };

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });
  const [isFilter, setIsFilter] = useState(false);
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

    const ifPresent = tasks.some((task) => task.id === formData.id);
    if (ifPresent) {
      const updatedArray = tasks.map((task) =>
        task.id === formData.id
          ? {
              ...task,
              title: formData.title,
              description: formData.description,
              status: formData.status,
              priority: formData.priority,
              dueDate: formData.dueDate,
            }
          : task,
      );

      setTasks(updatedArray);
      clearFormData();
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.dueDate.trim()
    )
      return;

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
    };

    setTasks((prev) => [...prev, newTask]);
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

  const filteredByPriority = tasks.filter(
    (task) => task.priority === filterPriority,
  );

  const sortTasksByDate = (taskList: Task[]) =>
    [...taskList].sort((a, b) => b.dueDate.localeCompare(a.dueDate));

  const sortedTasks = sortTasksByDate(tasks);
  const sortedFilteredByPriority = sortTasksByDate(filteredByPriority);

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as TaskPriority | "";
    setFilterPriority(priority);
    setIsFilter(priority !== "");
  };

  const pendingList = tasks.filter((task) => task.status === "pending");

  const inProgressList = tasks.filter((task) => task.status === "inProgress");

  const completedList = tasks.filter((task) => task.status === "completed");

  const list = [pendingList, inProgressList, completedList];
  const isReadOnly = formData.id !== "";

  return (
    <div className="container">
      <h1>Task Management System</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          disabled={isReadOnly}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          disabled={isReadOnly}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={isReadOnly}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          name="dueDate"
          placeholder="Enter due Date"
          value={formData.dueDate}
          onChange={handleChange}
          disabled={isReadOnly}
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <div>
        <div className="task-header">
          <h2>Tasks: </h2>
          <select value={filterPriority} onChange={handleFilter}>
            <option value="">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={() => setIsSorted((prev) => !prev)}>
            Sort by date
          </button>
        </div>
        <ul className="task-list">
          {!isFilter &&
            (!isSorted
              ? list.map((taskList, index) => (
                  <div key={index}>
                    <h5>
                      {index === 0
                        ? "Pending"
                        : index === 1
                          ? "InProgress"
                          : "Completed"}
                    </h5>
                    {taskList.map((rec) => (
                      <li key={rec.id}>
                        <p>Id: {rec.id}</p>
                        <span>Title: {rec.title}</span>
                        <span>Description:{rec.description}</span>
                        <p>
                          <span>Status: {rec.status}</span>
                          <span>Priority: {rec.priority}</span>
                          <span>DueDate: {rec.dueDate}</span>
                        </p>
                        <button onClick={() => handleDelete(rec.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleEdit(rec.id)}>Edit</button>
                      </li>
                    ))}
                    <hr />
                  </div>
                ))
              : sortedTasks.map((rec) => (
                  <li key={rec.id}>
                    <p>Id: {rec.id}</p>
                    <span>Title: {rec.title}</span>
                    <span>Description:{rec.description}</span>
                    <p>
                      <span>Status: {rec.status}</span>
                      <span>Priority: {rec.priority}</span>
                      <span>DueDate: {rec.dueDate}</span>
                    </p>
                    <button onClick={() => handleDelete(rec.id)}>Delete</button>
                    <button onClick={() => handleEdit(rec.id)}>Edit</button>
                  </li>
                )))}
          {isFilter &&
            (isSorted ? sortedFilteredByPriority : filteredByPriority).map(
              (rec) => (
                <li key={rec.id}>
                  <p>Id: {rec.id}</p>
                  <span>Title: {rec.title}</span>
                  <span>Description:{rec.description}</span>
                  <p>
                    <span>Status: {rec.status}</span>
                    <span>Priority: {rec.priority}</span>
                    <span>DueDate: {rec.dueDate}</span>
                  </p>
                  <button onClick={() => handleDelete(rec.id)}>Delete</button>
                  <button onClick={() => handleEdit(rec.id)}>Edit</button>
                </li>
              ),
            )}
        </ul>
      </div>
    </div>
  );
}

export default App;
