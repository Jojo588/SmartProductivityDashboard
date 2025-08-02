import "./index.css";
import Todo from "./components/Todo";
import StickyNotes from "./components/StickyNotes";
import Weather from "./components/Weather";
import Clock from "./components/Clock";
import ThemeToggle from "./components/ThemeToggle";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left max-sm:text-xl">🧠 Smart Productivity Dashboard</h1>
          <ThemeToggle z />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Clock />
            <Weather />
            <Todo tasks={tasks} setTasks={setTasks} />
            <div className="hidden lg:block"></div>
            <StickyNotes className="lg:col-span-3 flex justify-center" />
          </div>
        </DragDropContext>

      </div>
    </div>
  );
}
