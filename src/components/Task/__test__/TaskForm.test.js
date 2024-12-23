import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../TaskForm";

beforeEach(() => {
  global.alert = jest.fn();
});

describe("TaskForm Component", () => {
  it("should render the form and handle submission", () => {
    const mockOnSubmit = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        defaultDate={new Date("2024-12-23")}
        subCalendars={["Work", "Personal"]}
        onClose={mockOnClose}
      />
    );

    const input = screen.getByPlaceholderText("Task Title");
    const select = screen.getByRole("combobox");
    const saveButton = screen.getByText("Save Task");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.change(select, { target: { value: "Work" } });
    fireEvent.click(saveButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Test Task",
      calendarId: "Work",
      date: "2024-12-23",
      completed: false,
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when cancel button is clicked", () => {
    const mockOnClose = jest.fn();

    render(
      <TaskForm
        onSubmit={jest.fn()}
        defaultDate={new Date("2024-12-23")}
        subCalendars={["Work", "Personal"]}
        onClose={mockOnClose}
      />
    );

    const cancelButton = screen.getByText("X");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
