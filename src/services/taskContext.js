// src/services/taskContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { openDB } from "idb";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

const initeDB = async () => {
  try {
    const db = await openDB("TaskDB", 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        }
      },
    });
    console.log("Database initialized successfully:", db.name, db.version);
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [subCalendars, setSubCalendars] = useState(["Default", "Work", "Personal"]);
  const [activeCalendars, setActiveCalendars] = useState(["Default"]);

  const addSubCalendar = (newCalendarName) => {
    if (newCalendarName && !subCalendars.includes(newCalendarName)) {
      setSubCalendars((prev) => [...prev, newCalendarName]);
    }
  };

  // 切换活动子日历
  const toggleActiveCalendar = (calendarId) => {
    setActiveCalendars((prev) =>
      prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId]
    );
  };

  // 初始化加载任务
  const fetchInitialTasks = async () => {
    try {
      const db = await initeDB();
      const allTasks = {};
      const tx = db.transaction("tasks", "readonly");
      const store = tx.objectStore("tasks");
      let cursor = await store.openCursor();

      while (cursor) {
        const { date } = cursor.value;
        if (!allTasks[date]) {
          allTasks[date] = [];
        }
        allTasks[date].push(cursor.value);
        cursor = await cursor.continue();
      }

      setTasks(allTasks);
      console.log("Initial tasks loaded:", allTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  // 添加任务
  const addTask = async (newTask) => {
    try {
      const formattedDate = format(new Date(newTask.date || new Date()), "yyyy-MM-dd");
      const sanitizedTask = {
        title: newTask.title,
        calendarId: newTask.calendarId || "Default",
        date: formattedDate,
        completed: newTask.completed || false,
      };

      const db = await initeDB();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      const id = await store.add(sanitizedTask);
      const updatedTask = { id, ...sanitizedTask };

      setTasks((prevTasks) => ({
        ...prevTasks,
        [formattedDate]: [...(prevTasks[formattedDate] || []), updatedTask],
      }));

      console.log("Task added successfully:", updatedTask);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // 删除任务（记得统一格式化 date）
  const deleteTask = async (date, id) => {
    try {
      const dateKey = typeof date === "string"
        ? date
        : format(new Date(date), "yyyy-MM-dd");

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        if (newTasks[dateKey]) {
          newTasks[dateKey] = newTasks[dateKey].filter((t) => t.id !== id);
          if (newTasks[dateKey].length === 0) {
            delete newTasks[dateKey];
          }
        }
        return newTasks;
      });

      const db = await initeDB();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      await store.delete(id);

      console.log(`Task with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete task with ID ${id}:`, error);
      await fetchInitialTasks(); // 如果数据库更新失败，重新加载
    }
  };

  // 切换任务状态（也格式化 date）
  const toggleTaskStatus = async (date, id) => {
    try {
      const dateKey = typeof date === "string"
        ? date
        : format(new Date(date), "yyyy-MM-dd");

      const tasksForDate = tasks[dateKey] ? [...tasks[dateKey]] : [];
      const updatedTasks = tasksForDate.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTasks.find((task) => task.id === id);
      if (!updatedTask) {
        throw new Error("Task ID is missing or invalid");
      }

      const db = await initeDB();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      await store.put(updatedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [dateKey]: updatedTasks,
      }));

      console.log("Task status toggled:", updatedTask);
    } catch (error) {
      console.error("Failed to toggle task status:", error);
    }
  };

  // 编辑任务（同理先格式化 date）
  const editTask = async (date, id, newData) => {
    try {
      const dateKey = typeof date === "string"
        ? date
        : format(new Date(date), "yyyy-MM-dd");

      const tasksForDate = tasks[dateKey] ? [...tasks[dateKey]] : [];
      const updatedTasks = tasksForDate.map((task) =>
        task.id === id ? { ...task, ...newData } : task
      );

      const updatedTask = updatedTasks.find((task) => task.id === id);

      const db = await initeDB();
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");
      await store.put(updatedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [dateKey]: updatedTasks,
      }));

      console.log("Task edited:", updatedTask);
    } catch (error) {
      console.error("Failed to edit task:", error);
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

  useEffect(() => {
    fetchInitialTasks();
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
