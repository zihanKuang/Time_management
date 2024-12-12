// src/components/Task/TaskItem.jsx
import React from "react";
import { useTask } from "../../services/taskContext";

const TaskItem = ({ date, task, viewOnly = false}) => {
  const { toggleTaskStatus, editTask, deleteTask } = useTask();

  const handleToggle = () => {
    toggleTaskStatus(date, task.id);
  };

  const handleEdit = () => {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle) {
      editTask(date, task.id, { title: newTitle });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(date, task.id);
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
                onChange={handleToggle}
                />
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </span>
        )}
    </div>
  );
};

export default TaskItem;
