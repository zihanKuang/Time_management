import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthCalendar from '../MonthCalendar';
import { useTask } from '../../../services/taskContext';

jest.mock('../../../services/taskContext', () => ({
  useTask: jest.fn(),
}));

describe('MonthCalendar Component', () => {
  beforeEach(() => {
    // 给出 MonthCalendar 和 MonthChoiceBar 需要的全部 mock
    useTask.mockReturnValue({
      fetchTasks: jest.fn(() => []),
      activeCalendars: ['Default'],
      subCalendars: ['Default', 'Work'],
      toggleActiveCalendar: jest.fn(),
      addSubCalendar: jest.fn(),
    });
  });

  it('should render calendar grid with days', () => {
    render(<MonthCalendar currentDate={new Date('2024-12-01')} setSelectedDate={jest.fn()} />);
    // 检查是否渲染了日期单元格
    expect(screen.getAllByText(/\d+/).length).toBeGreaterThan(28);
  });

  it('should trigger setSelectedDate when a day is clicked', () => {
    const mockSetSelectedDate = jest.fn();
    render(<MonthCalendar currentDate={new Date('2024-12-01')} setSelectedDate={mockSetSelectedDate} />);

    // 修复：通过选择器指定唯一的元素
    const days = screen.getAllByText('1'); // 获取所有显示"1"的元素
    const firstDay = days.find((day) =>
      day.closest('.calendar-cell')?.classList.contains('selected') // 找到当前月份的 "1"
    );

    // 点击唯一的元素
    if (firstDay) fireEvent.click(firstDay);

    expect(mockSetSelectedDate).toHaveBeenCalled();
  });
});
