import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todos,
  toggleTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: string) => void;
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};
