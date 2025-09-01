export interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
  category?: string;          
  subtasks?: Subtask[];       
}
