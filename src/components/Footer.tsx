import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  category: string;
  setCategory: (category: string) => void;
}

export default function Footer({ todos, filter, setFilter, category, setCategory }: Props) {
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <span>{activeCount} items left</span>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-lg ${filter === "all" ? "bg-indigo-500 text-white" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-lg ${filter === "active" ? "bg-indigo-500 text-white" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-lg ${filter === "completed" ? "bg-indigo-500 text-white" : ""}`}
        >
          Completed
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCategory("all")}
          className={`px-3 py-1 rounded-lg ${category === "all" ? "bg-indigo-500 text-white" : ""}`}
        >
          All Categories
        </button>
        <button
          onClick={() => setCategory("Work")}
          className={`px-3 py-1 rounded-lg ${category === "Work" ? "bg-indigo-500 text-white" : ""}`}
        >
          Work
        </button>
        <button
          onClick={() => setCategory("Personal")}
          className={`px-3 py-1 rounded-lg ${category === "Personal" ? "bg-indigo-500 text-white" : ""}`}
        >
          Personal
        </button>
        <button
          onClick={() => setCategory("Shopping")}
          className={`px-3 py-1 rounded-lg ${category === "Shopping" ? "bg-indigo-500 text-white" : ""}`}
        >
          Shopping
        </button>
      </div>
    </div>
  );
}
