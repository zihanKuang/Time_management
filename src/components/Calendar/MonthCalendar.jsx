// 管理状态
// 生成日历网格
// 日期点击处理
// 渲染日历网格        

import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth,format } from "date-fns";

const MonthCalendar = ({currentDate,fetchTasks,setSelectedDate }) =>{

    // 全局都要用的变量，从父组件传过来
    //const [selectdDate,setSelectedDate] = useState(currentDate);

    const generateCalendarGrid =(date)=>{
        const startDate = startOfWeek(startOfMonth(date));
        const endDate = endOfWeek(endOfMonth(date));

        const grid = [];
        let currentDayPoint = startDate;

        while(currentDayPoint <= endDate){
            grid.push(currentDayPoint);
            currentDayPoint = addDays(currentDayPoint,1);
        }

        return grid;
    };

    // 更新父组件的 currentDate
    const handleDateClick=(date)=>{
        setSelectedDate(date);
    };

    const CalendarGrid = generateCalendarGrid(currentDate);

    return(
        <div>
            <h2 style={{textAlign:"center"}}>
                {format(currentDate,"MMMMM yyyy")}
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"10px"}}>
                {CalendarGrid.map((date,index)=>(
                    <div 
                    key={index}
                    style={{
                        padding:"10px",
                        textAlign:"center",
                        backgroundColor:isSameDay(date,currentDate)?"lightblue":"white",
                        color:isSameMonth(date,currentDate)?"black":"gray",
                        border:"1px solid #ccc",
                        cursor:"pointer",
                    }}
                    onClick={()=>handleDateClick(date)}
                    >
                        {format(date,"d")}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthCalendar;

