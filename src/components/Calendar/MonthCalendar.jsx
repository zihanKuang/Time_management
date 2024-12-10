// 管理状态
// 生成日历网格
// 日期点击处理
// 渲染日历网格        

import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth,format } from "date-fns";
import { useTask } from "../../services/taskContext";

const MonthCalendar = ({currentDate,setSelectedDate }) =>{

    const { fetchTasks } = useTask();

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

    // 获取日历网格
    const CalendarGrid = generateCalendarGrid(currentDate);

    return(
        <div>
            <h2 style={{textAlign:"center"}}>
                {format(currentDate,"MMMMM yyyy")}
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"10px"}}>
                {CalendarGrid.map((date,index)=>{
                    const tasks = fetchTasks(format(date,"yyyy-MM-dd"));// 获得任务
                    return(
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
                    onClick={()=>setSelectedDate(date)}
                    >

                    <div style={{fontWeight:"bold"}}>{format(date,"d")}</div>

                    <div style={{margin:"5px",fontSize:"0.8em",textAlign:"left"}}>
                        {

                            tasks.map((task,taskIndex)=>{
                                return(
                                    <div
                                    key={taskIndex}
                                    style={{
                                        backgroundColor:"#f0f0f0",
                                        borderRadius:"3px",
                                        padding:"2px 4px",
                                        marginBottom:"2px",
                                        overflow:"hidden",
                                        whiteSpace:"nowrap",
                                        textOverflow:"ellipsis"
                                    }}
                                    title={task.title}
                                    ></div>);
                                })
                        }

                    </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthCalendar;

