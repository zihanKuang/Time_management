import React from "react";
import CalendarBase from "./CalendarBase";
import { useTask } from "../../services/taskContext";

export const DayCalendar = ({ currentDate}) => {
    const {fetchTasks,toggleTaskStatus,editTask,deleteTask} = useTask();
    const tasks = fetchTasks(currentDate);
    
    return (
        <CalendarBase

            currentDate={currentDate}

            renderTasks={() => (
                
                <ul style={{listStyle:"none",padding:0}}>
                    {tasks.map((task) => (
                        <li key={task.id}>

                            <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={()=>toggleTaskStatus(currentDate,task.id)}>
                            </input>

                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </span>

                            <button onClick={() => editTask(currentDate,task.id)}>Edit</button>
                            <button onClick={() => deleteTask(currentDate,task.id)}>Delete</button>

                        </li>
                    ))}
                </ul>
            )}
        />
    );
};

export default DayCalendar;
