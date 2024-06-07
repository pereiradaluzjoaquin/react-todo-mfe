import { fireEvent, render } from "@testing-library/react";
import { TodoItem } from "./TodoItem";

const toggleTodo = jest.fn();
describe("TodoItem", () => {
  it("should render a todo item with a checkbox and text", () => {
    const todo = { id: "1", text: "New todo", isCompleted: false };
    const { getByText, getByRole } = render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} />
    );
    expect(getByRole("checkbox")).toBeInTheDocument();
    expect(getByText("New todo")).toBeInTheDocument();
  });

  it("should call toggleTodo when the checkbox is clicked", () => {
    const todo = { id: "1", text: "New todo", isCompleted: false };
    const { getByRole } = render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} />
    );
    const checkbox = getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(toggleTodo).toHaveBeenCalledWith("1");
  });

  it("should have a line-through style when the todo is completed", () => {
    const todo = { id: "1", text: "New todo", isCompleted: true };

    const { getByText } = render(
      <TodoItem todo={todo} toggleTodo={toggleTodo} />
    );
    const text = getByText("New todo");

    expect(text).toHaveStyle("text-decoration: line-through");
  });
});
