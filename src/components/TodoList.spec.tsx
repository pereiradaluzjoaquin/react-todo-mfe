import { render } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("should render a list of todo items", () => {
    const todos = [
      { id: "1", text: "New todo", isCompleted: false },
      { id: "2", text: "Another todo", isCompleted: true },
    ];

    const { getAllByRole } = render(
      <TodoList todos={todos} toggleTodo={() => {}} />
    );

    const items = getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });
});
