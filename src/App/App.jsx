// src/App.jsx
import React, { Component, useState, useCallback } from "react";
import { useTask, TaskProvider } from "../services/taskContext";
import DayCalendar from "../components/Calendar/DayCalendar";
import MonthCalendar from "../components/Calendar/MonthCalendar";
import TaskForm from "../components/Task/TaskForm";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <TaskProvider>
        <div className="app-container">
          <MainCalendar />
        </div>
      </TaskProvider>
    );
  }
}

const MainCalendar = () => {
  const { addTask } = useTask();

  // 当前选中的日期
  const [currentDate, setCurrentDate] = useState(new Date());

  // 子日历（默认、工作、个人）
  const [subCalendars, setSubCalendars] = useState(["Default", "Work", "Personal"]);
  const [activeCalendars, setActiveCalendars] = useState(["Default"]);

  // 控制“添加任务”表单是否可见
  const [isTaskFormVisible, setTaskFormVisible] = useState(false);

  // 添加子日历
  const addSubCalendar = useCallback(() => {
    const newCalendarName = prompt("Enter the name of the new calendar:");
    if (newCalendarName && !subCalendars.includes(newCalendarName)) {
      setSubCalendars((prev) => [...prev, newCalendarName]);
    }
  }, [subCalendars]);

  // 提交添加任务
  const handleTaskSubmit = useCallback(
    (newTask) => {
      addTask({
        ...newTask,
        // 如果表单里没指定日期，就使用 currentDate；并且统一转成字符串
        date: newTask.date || currentDate.toISOString(),
        // 默认所属子日历
        calendarId: newTask.calendarId || activeCalendars[0] || "Default",
      });
      // 提交完关表单
      setTaskFormVisible(false);
    },
    [addTask, currentDate, activeCalendars]
  );

  // 控制表单显隐
  const openTaskForm = () => setTaskFormVisible(true);
  const closeTaskForm = () => setTaskFormVisible(false);

  // 切换活动子日历
  const toggleActiveCalendar = useCallback((calendarId) => {
    setActiveCalendars((prev) =>
      prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId]
    );
  }, []);

  return (
    <div className="main-calendar">
      <div className="calendar-section">
        {/* 月视图 */}
        <div className="month-calendar">
          <MonthCalendar
            currentDate={currentDate}
            setSelectedDate={setCurrentDate}
            activeCalendars={activeCalendars}
            addSubCalendar={addSubCalendar}
            toggleActiveCalendar={toggleActiveCalendar}
          />

          {/* 添加任务表单 */}
          {isTaskFormVisible && (
            <TaskForm
              onSubmit={handleTaskSubmit}
              defaultDate={currentDate}
              subCalendars={subCalendars}
              onClose={closeTaskForm}
            />
          )}

          <div className="add-task-container">
            <button className="add-task-button" onClick={openTaskForm}>
              + Add Task
            </button>
          </div>
        </div>

        {/* 日视图 */}
        <div className="day-calendar">
          <DayCalendar currentDate={currentDate} activeCalendars={activeCalendars} />
        </div>
      </div>
    </div>
  );
};
