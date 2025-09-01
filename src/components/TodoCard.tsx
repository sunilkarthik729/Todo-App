import { CheckCircle, Trash2, Edit } from "lucide-react";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  openEditModal?: (todo: Todo) => void;
}

export default function TodoCard({ todo, setTodos, openEditModal }: Props) {
  const toggleTodo = () => {
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = () => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-xl rounded-3xl p-5 flex flex-col gap-3 border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
        isOverdue ? "border-red-500" : "border-transparent"
      }`}
    >
      <div className="flex justify-between items-center flex-wrap gap-2">
        <span
          onClick={toggleTodo}
          className={`cursor-pointer text-lg ${
            todo.completed ? "line-through text-gray-400" : ""
          } ${isOverdue ? "text-red-400" : ""} transition-colors`}
        >
          {todo.text}
        </span>
        <div className="flex gap-3">
          <CheckCircle
            className="text-green-400 cursor-pointer hover:text-green-500 transition-colors"
            size={22}
            onClick={toggleTodo}
          />
          <Trash2
            className="text-red-400 cursor-pointer hover:text-red-500 transition-colors"
            size={22}
            onClick={deleteTodo}
          />
          <Edit
            className="text-blue-400 cursor-pointer hover:text-blue-500 transition-colors"
            size={22}
            onClick={() => openEditModal?.(todo)}
          />
        </div>
      </div>

      {todo.subtasks && todo.subtasks.length > 0 && (
        <ul className="ml-4 mt-2 flex flex-col gap-1">
          {todo.subtasks.map(sub => (
            <li key={sub.id} className={`flex items-center gap-2 ${sub.completed ? "line-through text-gray-400" : ""}`}>
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => {
                  setTodos(prev =>
                    prev.map(t => {
                      if (t.id !== todo.id) return t;
                      const newSubs = t.subtasks!.map(s =>
                        s.id === sub.id ? { ...s, completed: !s.completed } : s
                      );
                      return { ...t, subtasks: newSubs };
                    })
                  );
                }}
              />
              <span>{sub.text || "New Subtask"}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center text-sm text-gray-300 flex-wrap gap-2">
        <span>
          {todo.dueDate
            ? `Due: ${new Date(todo.dueDate).toLocaleDateString()}`
            : "No Due Date"}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(todo.priority)}`}
        >
          {todo.priority}
        </span>
        {todo.category && (
          <span className="px-2 py-1 rounded-full bg-indigo-400 text-black text-xs font-semibold">
            {todo.category}
          </span>
        )}
      </div>
    </div>
  );
}
