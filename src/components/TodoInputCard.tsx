import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Todo } from "../types/todo";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoInputCard({ setTodos }: Props) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [category, setCategory] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, completed: false, dueDate, priority, category, subtasks: [] },
    ]);
    setText("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <div className="flex flex-col gap-3 mb-6 bg-white/10 backdrop-blur-xl rounded-3xl p-5">
  <div className="flex gap-2">
    <input
      type="text"
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type your task..."
      className="flex-1 px-4 py-3 rounded-2xl bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
    />
    <button
      onClick={addTodo}
      className="px-5 py-3 bg-indigo-500 rounded-2xl flex items-center gap-2 hover:bg-indigo-600 transition-colors"
    >
      <PlusCircle size={22} /> Add
    </button>
  </div>
  <div className="flex gap-2 flex-wrap">
    <input
      type="date"
      value={dueDate}
      onChange={e => setDueDate(e.target.value)}
      className="flex-1 px-4 py-3 rounded-2xl bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
    />
    <select
      value={priority}
      onChange={e => setPriority(e.target.value as any)}
      className="px-4 py-3 rounded-2xl bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
    >
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
    <div className="flex gap-2 mt-2">
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
  >
    <option value="">No Category</option>
    <option>Work</option>
    <option>Personal</option>
    <option>Shopping</option>
  </select>
</div>

  </div>
</div>

  );
}
