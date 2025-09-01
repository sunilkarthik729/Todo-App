import { useState } from "react";
import Header from "./components/Header";
import TodoInputCard from "./components/TodoInputCard";
import TodoListSection from "./components/TodoListSection";
import Footer from "./components/Footer";
import TodoEditModal from "./components/TodoEditModal";
import type { Todo } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useReminder } from "./hooks/useReminder";

export default function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // user-specific todos
  const [todos, setTodos] = useLocalStorage<Todo[]>(`todos_${username}`, []);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  useReminder(todos);
  const handleLogin = () => {
    if (username.trim() !== "") setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTodos([]); // clear todos when logout
    setUsername("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl mb-4">Login to Todo App</h1>
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="px-4 py-2 mb-4 rounded-lg text-black"
        />
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-lg">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Hello, {username}!</h2>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Logout</button>
        </div>

        <TodoInputCard setTodos={setTodos} />
        <TodoListSection 
          todos={todos} 
          setTodos={setTodos} 
          filter={filter} 
          openEditModal={setEditingTodo} 
          searchQuery={searchQuery}
        />
        <Footer todos={todos} filter={filter} setFilter={setFilter} />
      </div>

      {editingTodo && (
        <TodoEditModal 
          todo={editingTodo} 
          setTodos={setTodos} 
          onClose={() => setEditingTodo(null)} 
        />
      )}
    </div>
  );
}
