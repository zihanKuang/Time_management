// 点击按钮时触发回调函数
// 按钮上的文本
// 按钮前的图标
import React from "react";
//import "./CalendarButton.css"

const CalendarButton = ({label,onClick,icon})=>{
    return(
        <button className="calendar-button" onClick={onClick}>
            {icon && <span className="calendar-button-icon">{icon}</span>}
            <span className="calendar-button-label">{label}</span> 
        </button>
    );
};

export default CalendarButton;