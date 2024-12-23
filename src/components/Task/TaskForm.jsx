import React, { useState } from "react";
import { format } from "date-fns"; // Date formatting utility
import "./TaskForm.css"; // Import form-specific styles

const TaskForm = ({ onSubmit, defaultDate, subCalendars, onClose }) => {
  // State for task title
  const [title, setTitle] = useState("");
  // State for the selected calendar, defaulting to the first one
  const [calendarId, setCalendarId] = useState(subCalendars[0]);
  // State for the task date, defaulting to the provided date
  const [date, setDate] = useState(defaultDate);

  // Handle form submission
  const handleSubmit = () => {
    // Ensure the task title is not empty
    if (title.trim()) {
      try {
        // Pass task data to the parent component
        onSubmit({
          title,
          calendarId,
          date: format(date, "yyyy-MM-dd"), // Format date for consistency
          completed: false,
        });
        // Close the form after successful submission
        onClose();
      } catch (error) {
        console.error("Failed to add task. Ensure task data is serializable:", error);
      }
    } else {
      alert("Task title cannot be empty!"); // Alert the user for empty title
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>Add Task</h3>
        {/* Input field for task title */}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Dropdown for selecting a sub-calendar */}
        <select
          value={calendarId}
          onChange={(e) => setCalendarId(e.target.value)}
        >
          {subCalendars.map((calendar) => (
            <option key={calendar} value={calendar}>
              {calendar}
            </option>
          ))}
        </select>
        {/* Date picker for task date */}
        <input
          type="date"
          value={format(date, "yyyy-MM-dd")} // Ensure consistent date format
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        {/* Submit button */}
        <button onClick={handleSubmit}>Save Task</button>
      </div>
    </div>
  );
};

export default TaskForm;
