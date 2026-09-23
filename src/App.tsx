import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    title,
    description,
  });

  return (
    <div className="container">
      <h1>Task Manager System</h1>
      <form className="form-container">
        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
        />
        <input type="text" placeholder="Enter description" />
        <select>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input type="date" placeholder="Enter due Date" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
