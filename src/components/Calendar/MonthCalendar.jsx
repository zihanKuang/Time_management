import { React, useMemo } from "react";
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
import "./MonthCalendar.css";

const MonthCalendar = ({ currentDate, setSelectedDate }) => {
  const { fetchTasks, activeCalendars } = useTask();

  // Generate the full grid of days for the current month, including extra days from previous/next months
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

  // Map tasks to each day in the grid, filtered by active calendars
  const dateTasksMap = useMemo(() => {
    const map = {};
    calendarGrid.forEach((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      map[formattedDate] = fetchTasks(formattedDate, activeCalendars);
    });
    return map;
  }, [calendarGrid, activeCalendars, fetchTasks]);

  return (
    <div className="month-calendar">
      {/* Display the current month and year */}
      <h2 className="calendar-header">{format(currentDate, "MMMM yyyy")}</h2>

      {/* Navigation bar for switching months */}
      <MonthChoiceBar />

      {/* Calendar grid displaying the days and tasks */}
      <div className="calendar-grid">
        {calendarGrid.map((date) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const dailyTasks = dateTasksMap[formattedDate] || [];

          return (
            <div
              key={formattedDate}
              className={`calendar-cell ${
                isSameDay(date, currentDate) ? "selected" : ""
              } ${isSameMonth(date, currentDate) ? "" : "outside-month"}`}
              onClick={() => setSelectedDate(date)}
            >
              {/* Day number */}
              <div className="calendar-day">{format(date, "d")}</div>

              {/* Task preview for each day */}
              <div className="task-preview">
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
