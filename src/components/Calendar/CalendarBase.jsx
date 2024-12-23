import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const CalendarBase = ({ currentDate, fetchTasks, renderTasks }) => {
  // Optimize task fetching by memoizing the result
  const tasks = useMemo(() => fetchTasks(currentDate), [currentDate, fetchTasks]);

  // Format the given date as "yyyy-MM-dd"
  const formatDate = (date) => format(new Date(date), "yyyy-MM-dd");

  return (
    <div>
      <h1>Tasks for {formatDate(currentDate)}</h1>
      {renderTasks ? (
        renderTasks(tasks) // Use custom render function if provided
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

CalendarBase.propTypes = {
  // The selected date to display tasks for
  currentDate: PropTypes.instanceOf(Date).isRequired,
  // Function to retrieve tasks for a specific date
  fetchTasks: PropTypes.func.isRequired,
  // Optional custom render function for tasks
  renderTasks: PropTypes.func,
};

export default CalendarBase;
