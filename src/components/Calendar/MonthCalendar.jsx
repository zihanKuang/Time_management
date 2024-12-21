// src/components/Calendar/MonthCalendar.jsx
import React, { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  format,
} from "date-fns";
import { useTask } from "../../services/taskContext";
import TaskItem from "../Task/TaskItem";
import MonthChoiceBar from "../Navigation/MonthChoiceBar";
import CalendarButton from "../Navigation/CalendarButton";
import "./MonthCalendar.css";

const MonthCalendar = ({
  currentDate,
  setSelectedDate,
  activeCalendars,
  addSubCalendar,
  toggleActiveCalendar,
}) => {
  const { fetchTasks } = useTask();

  // 子日历选项
  const calendars = [
    { id: "Default", name: "Default" },
    { id: "Work", name: "Work" },
    { id: "Personal", name: "Personal" },
  ];

  // 生成该月在视图上的所有天
  const calendarGrid = useMemo(() => {
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));
    const grid = [];
    let day = startDate;
    while (day <= endDate) {
      grid.push(day);
      day = addDays(day, 1);
    }
    return grid;
  }, [currentDate]);

  // 每一天的任务，已按活动子日历过滤
  const dateTasksMap = useMemo(() => {
    const map = {};
    calendarGrid.forEach((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      map[formattedDate] = fetchTasks(formattedDate, activeCalendars);
    });
    return map;
  }, [calendarGrid, activeCalendars, fetchTasks]);

  const handleImport = () => {
    alert("Import functionality not implemented yet!");
  };

  const handleExport = () => {
    alert("Export functionality not implemented yet!");
  };

  return (
    <div className="month-calendar">
      <h2 className="calendar-header">{format(currentDate, "MMMM yyyy")}</h2>

      <MonthChoiceBar
        activeCalendars={activeCalendars}
        calendars={calendars}
        onSelectCalendar={toggleActiveCalendar}
        onAddCalendar={addSubCalendar}
      />

      <div className="calendar-actions">
        <CalendarButton label="Import" onClick={handleImport} icon="📁" />
        <CalendarButton label="Export" onClick={handleExport} icon="📤" />
      </div>

      <div className="calendar-grid">
        {calendarGrid.map((date, index) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const dailyTasks = dateTasksMap[formattedDate] || [];

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
                {/* 只读模式，只显示 dailyTasks */}
                {dailyTasks.map((task) => (
                  <TaskItem key={task.id} date={formattedDate} task={task} viewOnly={true} />
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
