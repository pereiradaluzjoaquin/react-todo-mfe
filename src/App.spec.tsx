import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("uuid", () => ({
  v4: () => "mocked-uuid",
}));

const localStorageMock = () => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
};
Object.defineProperty(window, "localStorage", { value: localStorageMock() });

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should render the app", () => {
    render(<App initialTodos={[]} />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add todo...")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  it("should add a todo item", () => {
    render(<App initialTodos={[]} />);
    const input = screen.getByPlaceholderText("Add todo...");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New todo")).toBeInTheDocument();
  });

  it("saves todos to localStorage", () => {
    render(<App initialTodos={[]} />);
    const input = screen.getByPlaceholderText("Add todo...");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);

    expect(localStorage.getItem("todos")).toEqual(
      JSON.stringify([
        { id: "mocked-uuid", text: "New todo", isCompleted: false },
      ])
    );
  });

  it("loads todos from localStorage", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ id: "1", text: "New todo", isCompleted: false }])
    );

    render(<App initialTodos={[]} />);

    expect(screen.getByText("New todo")).toBeInTheDocument();
  });

  it("loads with initial todos", () => {
    render(
      <App
        initialTodos={[{ id: "1", text: "Initial todo", isCompleted: false }]}
      />
    );

    expect(screen.getByText("Initial todo")).toBeInTheDocument();
  });
});
