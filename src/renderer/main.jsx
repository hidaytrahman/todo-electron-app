import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <img
        src="https://www.webtechpie.com/webtechpie.png"
        alt="App Logo"
        className="logo"
      />
      <h1>To-Do List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <p
              className="todo-toggle"
              onClick={() => toggleTodo(todo.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && toggleTodo(todo.id)
              }
              aria-pressed={todo.done}
              tabIndex={0}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {todo.text}
            </p>
            <button onClick={() => removeTodo(todo.id)} aria-label="Delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
