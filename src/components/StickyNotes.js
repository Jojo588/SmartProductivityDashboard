import { useState, useEffect } from "react";

export default function StickyNotes({ className = "" }) {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), text: "" }]);
  };

  const updateNote = (id, text) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text } : note));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

    return (
    <div className={`w-full ${className}`}>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-full max-w-4xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">🗒️ Sticky Notes</h2>
          <button
            className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
            onClick={addNote}
          >
            + Add Note
          </button>
        </div>
        <div className="flex flex-wrap gap-4 max-h-[200px] overflow-auto justify-center">
          {notes.map(note => (
            <div key={note.id} className="bg-yellow-100 p-3 rounded  w-2/5 max-lg:w-4/5">
              <textarea
                className="w-full p-2 border rounded"
                value={note.text}
                onChange={(e) => updateNote(note.id, e.target.value)}
                rows="5"
              />
              <button
                className="mt-2 text-sm text-red-600 hover:underline"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
