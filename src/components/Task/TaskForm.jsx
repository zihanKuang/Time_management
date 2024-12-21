import React, { useState } from "react";
import "./TaskForm.css"; // 表单样式

const TaskForm = ({ onSubmit, defaultDate, subCalendars, onClose }) => {
  const [title, setTitle] = useState("");
  const [calendarId, setCalendarId] = useState("Default");
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = () => {
    if (title.trim()) {
      try {
        onSubmit({
          title,
          calendarId,
          date: date.toISOString(), // 转换为字符串
          completed: false,
        });
        onClose(); // 提交成功后关闭表单
      } catch (error) {
        console.error("Failed to add task. Ensure task data is serializable:", error);
      }
    }
  };


  return (
    <div className="task-form-container">
      <div className="task-form">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>Add Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <input
          type="date"
          value={date.toISOString().split("T")[0]} // 格式化日期
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <button onClick={handleSubmit}>Save Task</button>
      </div>
    </div>
  );
};

export default TaskForm;
