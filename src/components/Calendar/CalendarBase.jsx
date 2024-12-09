//初始化状态
//格式化日期
//获取任务
//渲染任务列表
//属性类型检查

import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";

const CalendarBase = ({currentDate,fetchTasks,renderTasks}) => {
    //State for storing tasks
    const [tasks,setTasks]=useState([]);

    //Helper function to format the date
    const formatDate=(date)=>{
        return format(new Date(date),`yyyy-MM-dd`);
    };

    //Fetch tasks when the component mounts or when `currentDate` changes
    useEffect(()=>{
        const fetchTasksForDate = async()=>{
            const formattedDate = formatDate(currentDate);
            try{
                const fetchedTasks = await fetchTasks(formattedDate);
                setTasks(fetchedTasks);
            }catch(error){
                console.error("Failed to fetch tasks:",error);
            }
        };
        fetchTasksForDate();
    },[currentDate,fetchTasks]);

    return (
        <div>
            <h1>Tasks for {formatDate(currentDate)}</h1>
            {renderTasks? renderTasks(tasks):
                <ul>
                    {tasks.map((task, index) => {
                    return <li key={task.idx}>{task.title}</li>
                    })}
                </ul>
            }
        </div>
    );
};

CalendarBase.propTypes = {
    currentDate: PropTypes.instanceOf(Date).isRequired,
    fetchTasks: PropTypes.func.isRequired,
    renderTasks: PropTypes.func,
};

export default CalendarBase;

