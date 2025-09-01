import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
}

export default function Footer({ todos, filter, setFilter }: Props) {
  return (
    <div className="flex justify-between items-center mt-6 text-sm text-gray-300">
      <span>{todos.length} tasks</span>
      <div className="flex gap-3">
        <button
          className={`px-3 py-1 rounded-full ${
            filter === "all"
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-500 hover:text-white transition-colors"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filter === "active"
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-500 hover:text-white transition-colors"
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filter === "completed"
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-500 hover:text-white transition-colors"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
