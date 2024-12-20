import React from "react";
import CalendarBase from "./CalendarBase";
import { useTask } from "../../services/taskContext";
import TaskItem from "../Task/TaskItem";
import "./DayCalendar.css";

export const DayCalendar = ({ currentDate,activeCalendars}) => {
    const {fetchTasks} = useTask();
    const tasks = fetchTasks(currentDate,activeCalendars || []);
    console.log("Tasks:", tasks);
    
    return (
        <div className="day-calendar">
            <CalendarBase
            currentDate={currentDate}
            fetchTasks={()=>tasks}

            renderTasks={() => (
                <ul className="day-calendar-task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="day-calendar-task-item">
                            <TaskItem
                            date={currentDate}
                            task={task}
                            ></TaskItem>
                        </li>
                    ))}
                </ul>
            )}
        />
        </div>
    );
};

export default DayCalendar;
