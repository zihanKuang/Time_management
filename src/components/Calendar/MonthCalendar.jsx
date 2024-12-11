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
        <div> className="month-calendar"
            <h2 className='month-header'>{format(currentDate,"MMMMM yyyy")}</h2>
            <div className='calendar-header'>
                {CalendarGrid.map((date,index)=>{
                    const tasks = fetchTasks(format(date,"yyyy-MM-dd"));// 获得任务

                    return(
                    <div 
                        key={index}
                        className={`calendar-cell ${
                            isSameDay(date,currentDate) ? "selected" : "" 
                        } $ isSameDay(date,currentDate) ? "":"outside-month"}`}
                    onClick={()=>setSelectedDate(date)}>

                    <div className='calendar-day'>{format(date,"d")}</div>

                    <div className='task-preview'>
                        {tasks.map((task,taskIndex)=>(
                            <div key={taskIndex} className="task-item" title={task.title}>
                                {task.title}
                            </div>
                        ))}
                    </div>

                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthCalendar;

