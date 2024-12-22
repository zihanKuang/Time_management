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

  const { addTask, subCalendars, activeCalendars } = useTask();
  // 当前选中的日期
  const [currentDate, setCurrentDate] = useState(new Date());
  // 控制“添加任务”表单是否可见
  const [isTaskFormVisible, setTaskFormVisible] = useState(false);

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

  return (
    <div className="main-calendar">
      <div className="calendar-section">
        {/* 月视图 */}
        <div className="month-calendar">
          <MonthCalendar
            currentDate={currentDate}
            setSelectedDate={setCurrentDate}
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
