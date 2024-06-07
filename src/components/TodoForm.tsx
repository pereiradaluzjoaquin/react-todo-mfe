import { useState } from "react";

export const TodoForm = ({ addTodo }: { addTodo: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleOnChange}
        placeholder="Add todo..."
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};
