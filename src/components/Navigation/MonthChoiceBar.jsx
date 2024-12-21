// 渲染子日历的导航条，点哪个显示哪个，可以多个同时显示

// src/components/Navigation/MonthChoiceBar.jsx
import React from "react";
import "./MonthChoiceBar.css"; // 确保样式文件已导入

const MonthChoiceBar = ({ activeCalendars=[], calendars, onSelectCalendar,onAddCalendar }) => {

  return (
    <div className="month-choice-bar">
      {calendars.map((calendar) => (
        <button
          key={calendar.id}
          className={`calendar-choice-button ${
            activeCalendars.includes(calendar.id) ? "active" : ""
          }`}
          onClick={() => onSelectCalendar(calendar.id)}
        >
          {calendar.name}
        </button>
      ))}
      <button className="add-calendar-button" onClick={onAddCalendar}>
        + Add Calendar
      </button>
    </div>
  );
};

export default MonthChoiceBar; // 确保使用的是默认导出
