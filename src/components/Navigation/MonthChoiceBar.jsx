// 渲染子日历的导航条，点哪个显示哪个，可以多个同时显示

// src/components/Navigation/MonthChoiceBar.jsx
import React from "react";
import "./MonthChoiceBar.css"; // 确保样式文件已导入
import { useTask } from "../../services/taskContext";

const MonthChoiceBar = () => {

  const { subCalendars, activeCalendars, toggleActiveCalendar, addSubCalendar } = useTask();

  return (
    <div className="month-choice-bar">
      {subCalendars.map((calendar) => (
        <button
          key={calendar}
          className={`calendar-choice-button ${
            activeCalendars.includes(calendar) ? "active" : ""
          }`}
          onClick={() => toggleActiveCalendar(calendar)}
        >
          {calendar}
        </button>
      ))}

      <button
        className="add-calendar-button"
        onClick={() => {
          const newCalendarName = prompt("Enter the name of the new calendar:");
          addSubCalendar(newCalendarName);
        }}
      >
        + Add Calendar
      </button>
    </div>
  );
};

export default MonthChoiceBar; // 确保使用的是默认导出
