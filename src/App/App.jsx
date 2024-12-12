// 引入 React 核心库
import React, {Component, useState } from "react";
// 引入你的组件
import { TaskProvider } from "../services/taskContext";
import DayCalendar from "../components/Calendar/DayCalendar";
import MonthCalendar from "../components/Calendar/MonthCalendar";
import "./App.css";

//创建并暴露App组件
export default class App extends Component{
  render(){
    return(
      <TaskProvider>
        <div className="app-container">
          <MainCalendar/>
        </div>
      </TaskProvider>
    );
  }
}

const MainCalendar=()=>{
  // 使用 useState 创建了 currentDate 状态变量，并将初始值设置为当前日期（new Date()）
  // setCurrentDate 是更新该状态的函数，用于在用户点击某个日期时修改 currentDate 的值
  // currentDate 的值会传递给子组件（如 MonthCalendar 和 DayCalendar），让它们根据选中的日期显示任务或更新视图
  const[currentDate,setCurrentDate] = useState(new Date());

  // 使用 useState 创建了 subCalendars 状态变量，用于保存所有子日历的名称，初始值为一个包含 "Default" 的数组
  // 用户可以通过 UI（如“Add Calendar”按钮）向 subCalendars 中添加新的子日历（例如“工作”、“学习”）
  const[subCalendars,setSubCalendars] = useState(["Default"]);
  const [activeCalendar, setActiveCalendar] = useState("Default");

  // 
  const addSubCalendar = () => {
    const newCalendarName = prompt("Enter new calendar name:");
    if (newCalendarName && !subCalendars.includes(newCalendarName)) {
      setSubCalendars([...subCalendars, newCalendarName]);
    }
  };

  return(
      <div className="main-calendar">

        <div className="calendar-section">

          <div className="month-calendar">
            <MonthCalendar
            currentDate={currentDate}
            setSelectedDate={setCurrentDate}// 传递 setCurrentDate 给子组件
            calendar={activeCalendar}
            ></MonthCalendar>
          </div>

          <div className="day-calendar">
            <DayCalendar
            currentDate={currentDate}
            calendar={activeCalendar}
          ></DayCalendar>
          </div>

        </div>

        <div className="calendar-controls">
          {subCalendars.map((calendar,index)=>(
            <button 
            key={index}  
            onClick={() => setActiveCalendar(calendar)}
            className={`calendar-button ${
              activeCalendar === calendar ? "active" : ""
            }`}>
              {calendar}
            </button>
          ))}

          <button onClick={addSubCalendar} className="add-calendar-button">
            Add Calendar
          </button>

          <button onClick={()=>{console.log("Import Calendar")}}>
            Import Calendar
          </button>
        </div>
      </div>
  );
};