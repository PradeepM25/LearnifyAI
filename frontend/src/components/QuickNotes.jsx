import React, { useState } from 'react';
import { useGetNotesQuery, useAddNoteMutation } from '../features/api/quickNotesApi';

const QuickNotes = () => {
  const { data: notes = [], isLoading, isError } = useGetNotesQuery();
  const [addNote, { isLoading: isAdding }] = useAddNoteMutation();
  const [topic, setTopic] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      <ul className="space-y-4">
        {notes.length === 0 && <li className="text-gray-400">No quick notes yet.</li>}
        {notes.map((note) => (
          <li key={note._id} className="bg-gray-900/80 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-300 mb-2">{note.Title}</h3>
            <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: note.htmlContent }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickNotes;
