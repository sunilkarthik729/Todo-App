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
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useLocalStorage<Todo[]>(`todos_${username}`, []);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useReminder(todos);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (category !== "all" && todo.category !== category) return false;
    if (
      searchQuery &&
      !todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleLogin = () => {
    if (username.trim() !== "") setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTodos([]);
    setUsername("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
        <h1 className="text-3xl mb-4">Welcome to TaskMate</h1>
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Let's Begin
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Greeting and Logout */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Hello, {username}!</h2>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Todo Input */}
        <TodoInputCard
          setTodos={setTodos}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Todo List */}
        <TodoListSection
          todos={filteredTodos}
          setTodos={setTodos}
          filter={filter}
          openEditModal={setEditingTodo}
          searchQuery={searchQuery}
        />

        {/* Footer / Filters */}
        <Footer
          todos={todos}
          filter={filter}
          setFilter={setFilter}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Edit Modal */}
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
