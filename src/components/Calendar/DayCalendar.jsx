import React, { useMemo } from "react";
import CalendarBase from "./CalendarBase";
import { useTask } from "../../services/taskContext";
import TaskItem from "../Task/TaskItem";
import "./DayCalendar.css";

export const DayCalendar = ({ currentDate, activeCalendars }) => {
  const { fetchTasks, deleteTask, editTask } = useTask();

  // 当天任务（过滤子日历）
  const currentTasks = useMemo(() => {
    return fetchTasks(currentDate, activeCalendars || []);
  }, [currentDate, activeCalendars, fetchTasks]);

  return (
    <div className="day-calendar">
      <CalendarBase
        currentDate={currentDate}
        fetchTasks={(date) => fetchTasks(date, activeCalendars || [])}
        renderTasks={() =>
          !currentTasks || currentTasks.length === 0 ? (
            <p className="no-tasks-message">No tasks for this date</p>
          ) : (
            <ul className="day-calendar-task-list">
              {currentTasks.map((task) => (
                <li key={task.id} className="day-calendar-task-item">
                  <TaskItem
                    date={currentDate}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                </li>
              ))}
            </ul>
          )
        }
      />
    </div>
  );
};

export default DayCalendar;
