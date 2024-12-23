import React from "react";
// import "./CalendarButton.css"

/**
 * A reusable button component for calendar actions.
 * 
 * @param {string} label - The text displayed on the button.
 * @param {function} onClick - The callback function triggered when the button is clicked.
 * @param {string} [icon] - Optional icon displayed before the label.
 */
const CalendarButton = ({ label, onClick, icon }) => {
    return (
        <button className="calendar-button" onClick={onClick}>
            {/* Render the icon if provided */}
            {icon && <span className="calendar-button-icon">{icon}</span>}
            {/* Render the button label */}
            <span className="calendar-button-label">{label}</span>
        </button>
    );
};

export default CalendarButton;
