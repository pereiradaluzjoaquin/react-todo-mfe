import { Todo } from "../types/Todo";

export const TodoItem = ({
  todo,
  toggleTodo,
}: {
  todo: Todo;
  toggleTodo: (id: string) => void;
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`toogle todo ${todo.text}`}
      />
      <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.text}
      </span>
    </li>
  );
};
