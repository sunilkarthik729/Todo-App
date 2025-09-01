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
  openEditModal,
}: Props) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-3 mb-6"
          >
            {todos.length === 0 ? (
              <p className="text-center text-gray-400">No tasks found</p>
            ) : (
              todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoCard
                        todo={todo}
                        setTodos={setTodos}
                        openEditModal={openEditModal}
                      />
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
