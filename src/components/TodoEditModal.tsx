import { useState, useEffect } from "react";
import { XCircle, Save } from "lucide-react";
import type { Subtask, Todo } from "../types/todo";

interface Props {
  todo: Todo | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onClose: () => void;
}

export default function TodoEditModal({ todo, setTodos, onClose }: Props) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [subtasks, setSubtasks] = useState<Subtask[]>(todo?.subtasks || []);
  const [category, setCategory] = useState(todo?.category || "");
  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setDueDate(todo.dueDate || "");
      setPriority(todo.priority || "Medium");
      setSubtasks(todo.subtasks || []);
      setCategory(todo.category || "");
    }
  }, [todo]);

  if (!todo) return null;
  const addSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { id: Date.now(), text: "", completed: false },
    ]);
  };
  const saveChanges = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo!.id
          ? { ...t, text, dueDate, priority, category, subtasks } // update parent todos
          : t
      )
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black/90 p-6 rounded-2xl w-full max-w-md flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Task</h2>
          <XCircle
            className="text-red-400 cursor-pointer"
            size={24}
            onClick={onClose}
          />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-black/30 border border-gray-600 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Subtasks</h3>
          {subtasks.map((sub, idx) => (
            <div key={sub.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={sub.text}
                onChange={(e) => {
                  const newSubs = [...subtasks];
                  newSubs[idx].text = e.target.value;
                  setSubtasks(newSubs);
                }}
                className="flex-1 px-2 py-1 rounded bg-black/20 text-white"
              />
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => {
                  const newSubs = [...subtasks];
                  newSubs[idx].completed = !newSubs[idx].completed;
                  setSubtasks(newSubs);
                }}
              />
              <button
                onClick={() => {
                  setSubtasks(subtasks.filter((_, i) => i !== idx));
                }}
                className="text-red-400"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask} 
            className="text-indigo-400 hover:text-indigo-500"
          >
            + Add Subtask
          </button>
        </div>

        <button
          onClick={saveChanges}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Save size={20} /> Save
        </button>
      </div>
    </div>
  );
}
