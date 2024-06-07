import { render, fireEvent } from "@testing-library/react";
import { TodoForm } from "./TodoForm";

const addTodo = jest.fn();

describe("TodoForm", () => {
  it("should render a form with an input and a button", () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoForm addTodo={() => {}} />
    );
    expect(getByPlaceholderText("Add todo...")).toBeInTheDocument();
    expect(getByText("Add Todo")).toBeInTheDocument();
  });

  it("should call addTodo when the form is submitted", () => {
    const { getByText, getByPlaceholderText } = render(
      <TodoForm addTodo={addTodo} />
    );
    const input = getByPlaceholderText("Add todo...");
    const button = getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);

    expect(addTodo).toHaveBeenCalledWith("New todo");
  });

  it("should clear the input after the form is submitted", () => {
    const { getByText, getByPlaceholderText } = render(
      <TodoForm addTodo={addTodo} />
    );
    const input = getByPlaceholderText("Add todo...");
    const button = getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");
  });

  it("should not call addTodo when the input is empty", () => {
    const { getByText } = render(<TodoForm addTodo={addTodo} />);
    const button = getByText("Add Todo");

    fireEvent.click(button);

    expect(addTodo).not.toHaveBeenCalled();
  });
});
