import React, { useState } from 'react';
import { useGetNotesQuery, useAddNoteMutation } from '../features/api/quickNotesApi';

const QuickNotes = () => {
  const { data: notes = [], isLoading, isError } = useGetNotesQuery();
  const [addNote, { isLoading: isAdding }] = useAddNoteMutation();
  const [topic, setTopic] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  // Helper to extract a short overview from htmlContent (first 30 words)
  const getOverview = (html) => {
  // Remove code block markers like ```html or ```
  let clean = html.replace(/```html|```/gi, "");
  // Remove <style> and <script> blocks
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<script[\s\S]*?<\/script>/gi, "");
  // Remove all HTML tags
  clean = clean.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  // Only show first 30 words
  const words = clean.split(" ").filter(Boolean);
  return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (topic.trim()) {
      try {
        await addNote(topic).unwrap();
        setTopic("");
      } catch (err) {
        setErrorMsg(err?.data?.message || "Failed to add note");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes.</div>;

  return (
    <div className="quick-notes bg-white/10 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Quick Notes</h2>
      <form onSubmit={handleAddNote} className="flex gap-2 mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic for quick note..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
          disabled={isAdding}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Note"}
        </button>
      </form>
      {errorMsg && <div className="text-red-400 mb-2">{errorMsg}</div>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.length === 0 && <li className="text-gray-400">No quick notes yet.</li>}
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-gray-900/80 p-4 rounded-xl cursor-pointer hover:bg-gray-800 transition"
            onClick={() => setSelectedNote(note)}
          >
            <h3 className="font-semibold text-blue-300 mb-2">{note.Title}</h3>
            <div className="text-gray-300 text-sm mb-2">
              <span className="font-bold">Topic:</span> {note.Title}
              <br />
              <span className="font-bold">Overview:</span> {getOverview(note.htmlContent)}
            </div>
            <span className="text-xs text-blue-400 underline">View Full Note</span>
          </li>
        ))}
      </ul>

      {/* Modal for full note */}
      {selectedNote && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold"
              onClick={() => setSelectedNote(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-400 mb-4">{selectedNote.Title}</h2>
            <div
              className="quicknote-html prose prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedNote.htmlContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickNotes;
