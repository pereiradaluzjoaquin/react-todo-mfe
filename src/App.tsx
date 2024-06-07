import { useEffect, useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { Todo } from "./types/Todo";
import { v4 as uuidv4 } from "uuid";
import { isLocalStorageAvailable } from "./utils";

function App({ initialTodos = [] }: { initialTodos?: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (isLocalStorageAvailable()) {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : initialTodos;
    }
    return initialTodos;
  });
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    console.log("se monta");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.isCompleted;
    if (filter === "Completed") return todo.isCompleted;
  });

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="group-buttons">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
