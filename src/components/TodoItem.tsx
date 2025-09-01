import { CheckCircle, Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";
import React, { useState } from "react";


interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({ todo, setTodos }: Props) {
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, text: editText } : t))
    );
    setIsEditing(false);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <li className="flex justify-between items-center bg-black/30 px-4 py-3 rounded-lg shadow-md">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.text}
      </span>
      <div className="flex gap-3">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="text-green-400 hover:text-green-500"
        >
          <CheckCircle size={20} />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-400 hover:text-red-500"
        >
          <Trash2 size={20} />
        </button>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            className="flex-1 px-2 py-1 rounded bg-black/20 text-white"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={todo.completed ? "line-through text-gray-400" : ""}
          >
            {todo.text}
          </span>
        )}
      </div>
    </li>
  );
}
