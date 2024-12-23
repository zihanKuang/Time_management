import React, { useState } from "react";
import { format } from "date-fns"; // 导入格式化函数
import "./TaskForm.css"; // 表单样式

const TaskForm = ({ onSubmit, defaultDate, subCalendars, onClose }) => {
  const [title, setTitle] = useState("");
  const [calendarId, setCalendarId] = useState(subCalendars[0]); // 使用第一个子日历作为默认值
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = () => {
    if (title.trim()) {
      try {
        onSubmit({
          title,
          calendarId,
          date: format(date, "yyyy-MM-dd"), // 使用一致的日期格式
          completed: false,
        });
        onClose(); // 提交成功后关闭表单
      } catch (error) {
        console.error("Failed to add task. Ensure task data is serializable:", error);
      }
    } else {
      alert("Task title cannot be empty!"); // 提示任务标题不能为空
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
          value={format(date, "yyyy-MM-dd")} // 使用一致的日期格式
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <button onClick={handleSubmit}>Save Task</button>
      </div>
    </div>
  );
};

export default TaskForm;
