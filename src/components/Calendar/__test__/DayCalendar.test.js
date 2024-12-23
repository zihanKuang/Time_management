import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DayCalendar from '../DayCalendar';
import { useTask } from '../../../services/taskContext';

jest.mock('../../../services/taskContext', () => ({
  useTask: jest.fn(),
}));

describe('DayCalendar Component', () => {
  beforeEach(() => {
    useTask.mockReturnValue({
      fetchTasks: jest.fn(() => [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ]),
      deleteTask: jest.fn(),
      editTask: jest.fn(),
    });
  });

  it('should render tasks for the selected date', () => {
    render(<DayCalendar currentDate={new Date('2024-12-01')} activeCalendars={['Default']} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should render "No tasks" message if no tasks are available', () => {
    // 让 fetchTasks 返回空
    useTask.mockReturnValueOnce({
      fetchTasks: jest.fn(() => []),
      deleteTask: jest.fn(),
      editTask: jest.fn(),
    });

    render(<DayCalendar currentDate={new Date('2023-12-01')} activeCalendars={['Default']} />);
    // 这里断言之前，要确保 DayCalendar.jsx 有相应的 "No tasks for this date" 渲染逻辑
    expect(screen.getByText('No tasks for this date')).toBeInTheDocument();
  });
});
