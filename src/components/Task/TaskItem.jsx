// src/components/Task/TaskItem.jsx
import React from "react";
import { useTask } from "../../services/taskContext";

const TaskItem = ({ date, task, onDelete, onEdit, viewOnly = false }) => {
  const { toggleTaskStatus } = useTask();

  const handleEdit = () => {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle) {
      onEdit(date, task.id, { title: newTitle });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(date, task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span className="task-title">{task.title}</span>
      {!viewOnly && (
        <span className="task-ations">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskStatus(date, task.id)}
          />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </span>
      )}
    </div>
  );
};

export default TaskItem;
