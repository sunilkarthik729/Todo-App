import type { Todo } from "../types/todo";
import TodoCard from "./TodoCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: "all" | "active" | "completed";
  openEditModal: (todo: Todo) => void;
  searchQuery?: string;
}

export default function TodoListSection({
  todos,
  setTodos,
  filter,
  openEditModal,
  searchQuery = "",
}: Props) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTodos(items);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "active") return !todo.completed;
      return todo.completed;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-3 mb-6">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-400">No tasks found</p>
            ) : (
              filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoCard todo={todo} setTodos={setTodos} openEditModal={openEditModal} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
