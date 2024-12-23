// Renders a navigation bar for toggling sub-calendars visibility and adding new calendars

// src/components/Navigation/MonthChoiceBar.jsx
import React from "react";
import "./MonthChoiceBar.css"; // Import the corresponding styles
import { useTask } from "../../services/taskContext";

const MonthChoiceBar = () => {
  const { subCalendars, activeCalendars, toggleActiveCalendar, addSubCalendar } = useTask();

  return (
    <div className="month-choice-bar">
      {/* Render a button for each sub-calendar */}
      {subCalendars.map((calendar) => (
        <button
          key={calendar}
          className={`calendar-choice-button ${
            activeCalendars.includes(calendar) ? "active" : ""
          }`}
          onClick={() => toggleActiveCalendar(calendar)}
        >
          {calendar}
        </button>
      ))}

      {/* Button to add a new sub-calendar */}
      <button
        className="add-calendar-button"
        onClick={() => {
          const newCalendarName = prompt("Enter the name of the new calendar:");
          if (newCalendarName) {
            addSubCalendar(newCalendarName);
          }
        }}
      >
        + Add Calendar
      </button>
    </div>
  );
};

export default MonthChoiceBar; // Default export for the component
