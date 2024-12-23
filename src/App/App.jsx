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

  const [currentDate, setCurrentDate] = useState(new Date()); // Selected date state
  const [isTaskFormVisible, setTaskFormVisible] = useState(false); // Task form visibility state

  // Handles task submission
  const handleTaskSubmit = useCallback(
    (newTask) => {
      addTask({
        ...newTask,
        date: newTask.date || currentDate.toISOString(), // Use current date if no date is specified
        calendarId: newTask.calendarId || activeCalendars[0] || "Default", // Default to the first active calendar
      });
      setTaskFormVisible(false); // Close the form after submission
    },
    [addTask, currentDate, activeCalendars]
  );

  const openTaskForm = () => setTaskFormVisible(true); // Show the task form
  const closeTaskForm = () => setTaskFormVisible(false); // Hide the task form

  return (
    <div className="main-calendar">
      <div className="calendar-section">
        {/* Monthly calendar view */}
        <div className="month-calendar">
          <MonthCalendar
            currentDate={currentDate}
            setSelectedDate={setCurrentDate}
          />

          {/* Task form for adding new tasks */}
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

        {/* Daily calendar view */}
        <div className="day-calendar">
          <DayCalendar currentDate={currentDate} activeCalendars={activeCalendars} />
        </div>
      </div>
    </div>
  );
};
