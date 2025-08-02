import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Todo({ tasks, setTasks }) {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([
        ...tasks,
        { id: `${Date.now()}`, text: input, done: false }
      ]);
      setInput("");
    }
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow h-full">
      <h2 className="text-lg font-semibold mb-2">✅ To-do List</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded w-4/6"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          onClick={addTask}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      <Droppable droppableId="todoList">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 overflow-auto h-32"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex justify-between items-center p-2 rounded bg-gray-100 dark:bg-gray-700 transition
                      ${snapshot.isDragging ? "ring-2 ring-blue-400" : ""}`}
                  >
                    <span
                      onClick={() => toggleDone(task.id)}
                      className={`cursor-pointer flex-1 ${
                        task.done ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => removeTask(task.id)}>❌</button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
