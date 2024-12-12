import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, format } from "date-fns";
import { useTask } from "../../services/taskContext";
import TaskItem from "../Task/TaskItem";
import MonthChoiceBar from "../Navigation/MonthChoiceBar"; 
import CalendarButton from "../Navigation/CalendarButton"; 
import "./MonthCalendar.css";

const MonthCalendar = ({ currentDate, setSelectedDate }) => {

  const { fetchTasks } = useTask();

  // 子日历选项
  const calendars = [
    { id: "Default", name: "Default" },
    { id: "Work", name: "Work" },
    { id: "Personal", name: "Personal" },
  ];

  // 当前选中的子日历（多选）
  const [activeCalendars, setActiveCalendars] = useState(["Default"]);
  console.log("Active Calendars:", activeCalendars);

  // 生成日历网格
  const generateCalendarGrid = (date) => {
    const startDate = startOfWeek(startOfMonth(date));
    const endDate = endOfWeek(endOfMonth(date));
    const grid = [];

    let currentDay = startDate;
    while (currentDay <= endDate) {
      grid.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }
    return grid;
  };

  const CalendarGrid = generateCalendarGrid(currentDate);

  const handleImport = () => {
    alert("Import functionality not implemented yet!");
  };
  const handleExport = () => {
    alert("Export functionality not implemented yet!");
  };

  const handleSelectCalendar = (id) => {
    setActiveCalendars((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((calendarId) => calendarId !== id)
        : [...prev, id];
      console.log("Updated Active Calendars:", updated); // 打印最新的状态
      return updated;
    });
  };

  return (
    <div className="month-calendar">
      <h2 className="calendar-header">{format(currentDate, "MMMM yyyy")}</h2>

      <MonthChoiceBar
        activeCalendars={activeCalendars}
        calendars={calendars}
        onSelectCalendar={handleSelectCalendar}
      />

      <div className="calendar-actions">
        <CalendarButton label="Import" onClick={handleImport} icon="📁"></CalendarButton>
        <CalendarButton label="Export" onClick={handleExport} icon="📤"></CalendarButton>
      </div>

      <div className="calendar-grid">
        {CalendarGrid.map((date, index) => {
          const tasks = fetchTasks(
            format(date, "yyyy-MM-dd"),
            activeCalendars); // 获取任务
            console.log("Tasks for date:", format(date, "yyyy-MM-dd"), "Calendars:", activeCalendars, "Tasks:", tasks);

          return (
            <div
              key={index}
              className={`calendar-cell ${
                isSameDay(date, currentDate) ? "selected" : ""
              } ${isSameMonth(date, currentDate) ? "" : "outside-month"}`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="calendar-day">{format(date, "d")}</div>

              <div className="task-preview">
                {tasks.map((task)=>(
                  <TaskItem
                  key={task.id}
                  date={format(date,"yyyy-MM-dd")}
                  task={task}
                  viewOnly={true} // 设置为仅展示模式
                  ></TaskItem>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendar;
