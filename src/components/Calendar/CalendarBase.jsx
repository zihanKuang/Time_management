import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const CalendarBase = ({ currentDate, fetchTasks, renderTasks }) => {
  // 使用 useMemo 优化任务获取
  const tasks = useMemo(() => fetchTasks(currentDate), [currentDate, fetchTasks]);

  // 格式化日期
  const formatDate = (date) => format(new Date(date), "yyyy-MM-dd");

  return (
    <div>
      <h1>Tasks for {formatDate(currentDate)}</h1>
      {renderTasks ? (
        renderTasks(tasks)
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
  currentDate: PropTypes.instanceOf(Date).isRequired,
  fetchTasks: PropTypes.func.isRequired,
  renderTasks: PropTypes.func,
};

export default CalendarBase;
