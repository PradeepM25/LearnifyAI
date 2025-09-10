import React, { useState } from "react";
import { useGetModulesQuery, useAddModuleMutation } from "../features/api/modulesApi";

const Modules = () => {
  const { data: modules = [], isLoading, isError } = useGetModulesQuery();
  const [addModule, { isLoading: isAdding }] = useAddModuleMutation();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);

  const handleAddModule = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (title.trim()) {
      try {
        await addModule({ title, difficulty }).unwrap();
        setTitle("");
        setDifficulty("beginner");
      } catch (err) {
        setErrorMsg(err?.data?.message || "Failed to add module");
      }
    }
  };

  if (isLoading) return <div>Loading modules...</div>;
  if (isError) return <div>Error loading modules.</div>;

  return (
    <div className="modules bg-white/10 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-400">Modules</h2>
      <form onSubmit={handleAddModule} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter module title..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
          disabled={isAdding}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
          disabled={isAdding}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Module"}
        </button>
      </form>
      {errorMsg && <div className="text-red-400 mb-2">{errorMsg}</div>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.length === 0 && <li className="text-gray-400">No modules yet.</li>}
        {modules.map((module) => (
          <li
            key={module._id}
            className="bg-gray-900/80 p-4 rounded-xl cursor-pointer hover:bg-gray-800 transition"
            onClick={() => setSelectedModule(module)}
          >
            <h3 className="font-semibold text-purple-300 mb-2">{module.title}</h3>
            <div className="text-gray-300 text-sm mb-2">
              <span className="font-bold">Difficulty:</span> {module.difficulty}
              <br />
              <span className="font-bold">Topics:</span> {module.topics?.length || 0}
            </div>
            <span className="text-xs text-purple-400 underline">View Details</span>
          </li>
        ))}
      </ul>

      {/* Modal for full module */}
      {selectedModule && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedModule(null)}
        >
          <div
            className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold"
              onClick={() => setSelectedModule(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">{selectedModule.title}</h2>
            <div className="mb-2 text-gray-300">
              <span className="font-bold">Difficulty:</span> {selectedModule.difficulty}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Topics</h3>
              <ul className="list-disc pl-5">
                {selectedModule.topics?.map((topic, idx) => (
                  <li key={topic._id || idx} className="mb-2">
                    <span className="font-bold text-blue-300">{topic.title}</span>
                    <div className="text-gray-400 text-sm mb-1">{topic.description}</div>
                    <div>
                      <h4 className="font-semibold text-purple-300">Lessons:</h4>
                      <ul className="list-decimal pl-5">
                        {topic.lessons?.map((lesson, lidx) => (
                          <li key={lidx} className="mb-1">
                            <span className="font-bold">{lesson.title}</span>
                            <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: lesson.fullLessonPlan }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modules;
