import React from "react";
import CalendarBase from "./CalendarBase";
import { useTask } from "../../services/taskContext";
import "./DayCalendar.css";

export const DayCalendar = ({ currentDate,activeCalendar}) => {
    const {fetchTasks,toggleTaskStatus,editTask,deleteTask} = useTask();
    const tasks = fetchTasks(currentDate,activeCalendar);
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

                            <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={()=>toggleTaskStatus(currentDate,task.id)}
                            className ="day-calendar-checkox">
                            </input>

                            <span className={`day-calendar-task-title}${
                                task.completed ? "completed" : ""
                            }`}>
                                {task.title}
                            </span>

                            <button className="day-calendar-edit-button" onClick={() => editTask(currentDate,task.id,{title : "New Title"})}>
                                Edit
                                </button>
                            <button className="day-calendar-delete-button" onClick={() => deleteTask(currentDate,task.id)}>
                                Delete
                                </button>
                        </li>
                    ))}
                </ul>
            )}
        />
        </div>
    );
};

export default DayCalendar;
