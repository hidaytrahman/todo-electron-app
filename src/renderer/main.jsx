import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import MachineInfo from './MachineInfo.jsx';
import About from './About.jsx';
import Settings from './Settings.jsx';
import UserProfile from './UserProfile.jsx';
import ExportImport from './ExportImport.jsx';
import Notifications from './Notifications.jsx';

function HamburgerMenu({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  return (
    <>
      <button
        className="hamburger"
        aria-label="Open navigation menu"
        onClick={() => setOpen(o => !o)}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      <nav className={`nav-menu${open ? ' open' : ''}`}>
        {children}
      </nav>
      {open && (
        <div
          className="nav-backdrop"
          tabIndex={0}
          role="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(false)}
        />
      )}
    </>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Listen for import event
  useEffect(() => {
    const handler = (e) => setTodos(e.detail);
    window.addEventListener('import-todos', handler);
    return () => window.removeEventListener('import-todos', handler);
  }, []);

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
            <button
              className="todo-toggle"
              onClick={() => toggleTodo(todo.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && toggleTodo(todo.id)
              }
              aria-pressed={todo.done}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {todo.text}
            </button>
            <button onClick={() => removeTodo(todo.id)} aria-label="Delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <HamburgerMenu>
        <Link to="/">Todo</Link>
        <Link to="/machine-info">Machine Info</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/user-profile">User Profile</Link>
        <Link to="/export-import">Export/Import</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/about">About</Link>
      </HamburgerMenu>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/machine-info" element={<MachineInfo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/export-import" element={<ExportImport />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
