import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../TaskItem";
import { useTask } from "../../../services/taskContext";

// Mock useTask to avoid undefined errors
jest.mock("../../../services/taskContext", () => ({
  useTask: jest.fn(),
}));

// Mock window.prompt and window.confirm
global.prompt = jest.fn();
global.confirm = jest.fn();

describe("TaskItem Component", () => {
  const mockTask = { id: 1, title: "Test Task", completed: false };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockToggleTaskStatus = jest.fn();

  beforeEach(() => {
    // Reset mock implementations
    useTask.mockReturnValue({
      toggleTaskStatus: mockToggleTaskStatus,
    });

    jest.clearAllMocks();
    global.prompt.mockReturnValue("Edited Task Title");
    global.confirm.mockReturnValue(true);
  });

  it("should render the task title correctly", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Verify the task title is displayed
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Trigger the edit button
    fireEvent.click(screen.getByText("Edit"));

    // Verify onEdit is called with the correct arguments
    expect(global.prompt).toHaveBeenCalledWith("Edit task title:", "Test Task");
    expect(mockOnEdit).toHaveBeenCalledWith(
      undefined,
      mockTask.id,
      { title: "Edited Task Title" }
    );
  });

  it("should call onDelete when delete button is clicked", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Trigger the delete button
    fireEvent.click(screen.getByText("Delete"));

    // Verify onDelete is called with the correct arguments
    expect(global.confirm).toHaveBeenCalledWith("Are you sure you want to delete this task?");
    expect(mockOnDelete).toHaveBeenCalledWith(undefined, mockTask.id);
  });

  it("should call toggleTaskStatus when checkbox is clicked", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Trigger the checkbox
    fireEvent.click(screen.getByRole("checkbox"));

    // Verify toggleTaskStatus is called with the correct arguments
    expect(mockToggleTaskStatus).toHaveBeenCalledWith(undefined, mockTask.id);
  });
});
