import { useEffect } from "react";
import type { Todo } from "../types/todo";

export function useReminder(todos: Todo[]) {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.dueDate && !todo.completed) {
          const due = new Date(todo.dueDate);
          if (
            due.getFullYear() === now.getFullYear() &&
            due.getMonth() === now.getMonth() &&
            due.getDate() === now.getDate() &&
            due.getHours() === now.getHours() &&
            due.getMinutes() === now.getMinutes()
          ) {
            alert(`Reminder: "${todo.text}" is due now!`);
          }
        }
      });
    }, 60000); // every 1 min

    return () => clearInterval(interval);
  }, [todos]);
}
