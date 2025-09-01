import { useState } from "react";

import type { Todo } from "../types/todo";

interface Props {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoInputCard({ setTodos, darkMode }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [category, setCategory] = useState<string>("General");
  const [dueDate, setDueDate] = useState<string>("");

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      priority,
      category,
      dueDate: dueDate,
      completed: false,
      subtasks: [],
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
    setPriority("Medium");
    setCategory("General");
    setDueDate("");
  };

  const inputBg = darkMode
    ? "bg-gray-800/40 text-white placeholder-gray-400"
    : "bg-white/40 text-black placeholder-gray-600";

  return (
    <div
      className={`w-full p-6 rounded-3xl backdrop-blur-xl ${
        darkMode ? "bg-gray-900/50" : "bg-white/30"
      } shadow-lg flex flex-col gap-4 mb-6 transition-all duration-300`}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full px-4 py-3 rounded-2xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${inputBg}`}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
          className={`flex-1 px-4 py-3 rounded-2xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${inputBg}`}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-2xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${inputBg}`}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-2xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 ${inputBg}`}
        />
      </div>

      <button
        onClick={addTodo}
        className="self-end px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all duration-300"
      >
        Add Task
      </button>
    </div>
  );
}
