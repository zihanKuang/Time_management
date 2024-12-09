import React from "react";
import CalendarBase from "./CalendarBase";

export const DayCalendar = ({ currentDate, fetchTasks, editTask, deleteTask, toggleTaskStatus }) => {
    const handleEdit = (taskId) => {
        editTask(taskId);
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId);
    };

    const handleToggleStatus = (taskId) => {
        toggleTaskStatus(taskId);
    };

    return (
        <CalendarBase

            currentDate={currentDate}
            fetchTasks={fetchTasks}

            renderTasks={(tasks) => (

                <ul style={{listStyle:"none",padding:0}}>
                    {tasks.map((task) => (
                        <li key={task.id}>

                            <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={()=>handleToggleStatus(task.id)}>
                            </input>

                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </span>

                            <button onClick={() => handleEdit(task.id)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>

                        </li>
                    ))}
                </ul>
            )}
        />
    );
};

export default DayCalendar;
