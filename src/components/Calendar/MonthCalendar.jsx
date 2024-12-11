import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, format } from "date-fns";
import { useTask } from "../../services/taskContext";
import "./MonthCalendar.css";

const MonthCalendar = ({ currentDate, setSelectedDate }) => {
  const { fetchTasks } = useTask();

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

  return (
    <div className="month-calendar">
      <h2 className="calendar-header">{format(currentDate, "MMMM yyyy")}</h2>

      <div className="calendar-grid">
        {CalendarGrid.map((date, index) => {
          const tasks = fetchTasks(format(date, "yyyy-MM-dd")); // 获取任务

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
                {tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="task-item" title={task.title}>
                    {task.title}
                  </div>
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
