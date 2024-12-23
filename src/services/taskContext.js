import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import {
  openDatabase,
  getAllFromStore,
  addToStore,
  updateInStore,
  deleteFromStore,
} from "../utils/dbUtils";

// Create a context for task management
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTask = () => useContext(TaskContext);

// TaskProvider component to manage tasks and sub-calendars
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [subCalendars, setSubCalendars] = useState([]);
  const [activeCalendars, setActiveCalendars] = useState(["Default"]);

  // Load initial tasks and sub-calendars from the database
  const fetchInitialData = async () => {
    try {
      const db = await openDatabase();
      console.log("Database connected:", db.name);

      const [loadedTasks, loadedSubCalendars] = await Promise.all([
        getAllFromStore("tasks"),
        getAllFromStore("subCalendars"),
      ]);

      // Insert default sub-calendars if none exist
      if (loadedSubCalendars.length === 0) {
        const defaultCalendars = ["Default", "Work", "Personal"];
        await Promise.all(
          defaultCalendars.map((name) => addToStore("subCalendars", { name }))
        );
        setSubCalendars(defaultCalendars);
      } else {
        setSubCalendars(loadedSubCalendars.map((cal) => cal.name));
      }

      // Organize tasks by date
      const tasksByDate = {};
      loadedTasks.forEach((task) => {
        const { date } = task;
        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }
        tasksByDate[date].push(task);
      });

      setTasks(tasksByDate);
      console.log("Initial data loaded:", { tasksByDate, subCalendars: loadedSubCalendars });
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };

  // Add a new sub-calendar
  const addSubCalendar = async (newCalendarName) => {
    if (newCalendarName && !subCalendars.includes(newCalendarName)) {
      try {
        await addToStore("subCalendars", { name: newCalendarName });
        setSubCalendars((prev) => [...prev, newCalendarName]);
        console.log(`Sub-calendar "${newCalendarName}" added.`);
      } catch (error) {
        console.error("Failed to add sub-calendar:", error);
      }
    }
  };

  // Toggle the active state of a sub-calendar
  const toggleActiveCalendar = (calendarId) => {
    setActiveCalendars((prev) =>
      prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId]
    );
  };

  // Add a new task
  const addTask = async (newTask) => {
    const formattedDate = format(new Date(newTask.date || new Date()), "yyyy-MM-dd");
    const task = { ...newTask, date: formattedDate, completed: false };
    try {
      const id = await addToStore("tasks", task);
      setTasks((prev) => ({
        ...prev,
        [formattedDate]: [...(prev[formattedDate] || []), { ...task, id }],
      }));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (date, id) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    try {
      await deleteFromStore("tasks", id);
      setTasks((prev) => ({
        ...prev,
        [formattedDate]: prev[formattedDate].filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Toggle task completion status
  const toggleTaskStatus = async (date, id) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const task = tasks[formattedDate]?.find((t) => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      try {
        await updateInStore("tasks", updatedTask);
        setTasks((prev) => ({
          ...prev,
          [formattedDate]: prev[formattedDate].map((t) =>
            t.id === id ? updatedTask : t
          ),
        }));
      } catch (error) {
        console.error("Failed to toggle task status:", error);
      }
    }
  };

  // Edit an existing task
  const editTask = async (date, id, newData) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const task = tasks[formattedDate]?.find((t) => t.id === id);
    if (task) {
      const updatedTask = { ...task, ...newData };
      try {
        await updateInStore("tasks", updatedTask);
        setTasks((prev) => ({
          ...prev,
          [formattedDate]: prev[formattedDate].map((t) =>
            t.id === id ? updatedTask : t
          ),
        }));
      } catch (error) {
        console.error("Failed to edit task:", error);
      }
    }
  };

  // Fetch tasks for a specific date and active calendars
  const fetchTasks = useCallback(
    (date, activeCalendars) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      const tasksForDate = tasks[formattedDate] || [];

      if (!activeCalendars || activeCalendars.length === 0) {
        return tasksForDate;
      }
      return tasksForDate.filter((task) => activeCalendars.includes(task.calendarId));
    },
    [tasks]
  );

  // Load initial data on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskStatus,
        editTask,
        fetchTasks,
        subCalendars,
        addSubCalendar,
        activeCalendars,
        toggleActiveCalendar,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
