// src/services/taskContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

import {
  openDatabase,
  getAllFromStore,
  addToStore,
  updateInStore,
  deleteFromStore,
} from "../utils/dbUtils";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [subCalendars, setSubCalendars] = useState([]);
  const [activeCalendars, setActiveCalendars] = useState(["Default"]);

  // 初始化加载任务和子日历
  const fetchInitialData = async () => {
    try {
      const db = await openDatabase();
      console.log("Database connected:", db.name);
  
      const [loadedTasks, loadedSubCalendars] = await Promise.all([
        getAllFromStore("tasks"),
        getAllFromStore("subCalendars"),
      ]);

    // 插入默认子日历（仅当数据库为空时）
    if (loadedSubCalendars.length === 0) {
      const defaultCalendars = ["Default", "Work", "Personal"];
      await Promise.all(
        defaultCalendars.map((name) => addToStore("subCalendars", { name }))
      );
      console.log("Inserted default sub-calendars into database.");
      setSubCalendars(defaultCalendars); // 更新状态
    } else {
      setSubCalendars(loadedSubCalendars.map((cal) => cal.name)); // 正常加载数据库中的子日历
    }
  
      // 格式化任务数据
      const tasksByDate = {};
      loadedTasks.forEach((task) => {
        const { date } = task;
        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }
        tasksByDate[date].push(task);
      });
  
      setTasks(tasksByDate);
      setSubCalendars(loadedSubCalendars.map((cal) => cal.name));
  
      console.log("Initial data loaded:", { tasksByDate, subCalendars: loadedSubCalendars });
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  };
  

 // **添加子日历**
 const addSubCalendar = async (newCalendarName) => {
  if (newCalendarName && !subCalendars.includes(newCalendarName)) {
    try {
      await addToStore("subCalendars", { name: newCalendarName }); // 保存到数据库
      setSubCalendars((prev) => [...prev, newCalendarName]); // 更新状态
      console.log(`Sub-calendar "${newCalendarName}" added.`);
    } catch (error) {
      console.error("Failed to add sub-calendar:", error);
    }
  }
};

// 切换活动子日历
const toggleActiveCalendar = (calendarId) => {
  setActiveCalendars((prev) =>
    prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId]
  );
};

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

  // 删除任务
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

  // 切换任务状态
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

  // 编辑任务
  const editTask = async (date, id, newData) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const task = tasks[formattedDate]?.find((t) => t.id === id);
    if (task) {
      const updatedTask = { ...task, ...newData };
      try {
        await updateInStore("tasks", updatedTask); // 更新数据库
        setTasks((prev) => ({
          ...prev,
          [formattedDate]: prev[formattedDate].map((t) =>
            t.id === id ? updatedTask : t
          ),
        })); // 更新状态
      } catch (error) {
        console.error("Failed to edit task:", error);
      }
    }
  };

 // 获取任务
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

  // **初始化加载**
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
