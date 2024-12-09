// 引入 React 核心库
import React, { Component, useState } from "react";
// 引入你的组件
import DayCalendar from "../components/Calendar/DayCalendar";
import MonthCalendar from "../components/Calendar/MonthCalendar";

const mockTasks={
  "2024-12-01":[{id:1,title:"Task 1",completed:false}],
  "2024-12-05":[
    {id:2,title:"Task 123",completed:false},
    {id:3,title:"Task 234",completed:true},
  ],
};

const fetchTasks = async(date) => { 
  return mockTasks[date]||[];
};

const editTask=(taskId) =>{
  console.log(`Edit task: ${taskId}`);
};

const deleteTask=(taskId)=>{
  console.log(`Delete task:${taskId}`);
};

const toggleTaskStatus=(taskId)=>{
  console.log(`Toggle task status:${taskId}`);
};

//创建并暴露App组件
export default class App extends Component{
  render(){
    return(
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center" }}>My Calendar App</h1>
        <MainCalendar></MainCalendar>
      </div>
    );
  }
}

const MainCalendar=()=>{
  const[currentDate,setCurrentDate] = useState(new Date());// 当前选中日期
  const[subCalendars,setSubCalendars] = useState(["Default"]);//子日历列表
  const [activeCalendar, setActiveCalendar] = useState("Default"); // 当前激活的子日历

  const addSubCalendar = () => {
    const newCalendarName = prompt("Enter new calendar name:");
    if (newCalendarName && !subCalendars.includes(newCalendarName)) {
      setSubCalendars([...subCalendars, newCalendarName]);
    }
  };

  return(
      <div style = {{display:"flex",flexDirection:"column",height:"100vh"}}>

        <div style={{flex:1, display: "flex"}}>
          <div style={{flex:2,borderRight:"1px solid #ccc", padding: "10px"}}>
            <MonthCalendar
            currentDate={currentDate}
            fetchTasks={fetchTasks}
            setSelectedDate={setCurrentDate}// 传递 setCurrentDate 给子组件
            ></MonthCalendar>
          </div>

          <div style={{flex:3, padding: "10px"}}>
            <DayCalendar
            currentDate={currentDate}
            fetchTasks={fetchTasks}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleTaskStatus={toggleTaskStatus}
          ></DayCalendar>
          </div>
        </div>

        <div style={{display:"flex",justifyContent:"space-around",padding:"10px",borderTop:"1px solid #ccc"}}>

          {subCalendars.map((calendar,index)=>(
            <button 
            key={index}  
            onClick={() => setActiveCalendar(calendar)}
            style={{
              padding: "5px 10px",
              backgroundColor: activeCalendar === calendar ? "lightblue" : "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
            >
              {calendar}
            </button>
          ))}

          <button onClick={addSubCalendar}>
            Add Calendar
          </button>

          <button onClick={()=>{console.log("Import Calendar")}}>
            Import Calendar
          </button>
        </div>
      </div>
  );
};