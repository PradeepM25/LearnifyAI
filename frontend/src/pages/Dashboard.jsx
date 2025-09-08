import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import QuickNotes from "../components/QuickNotes";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  console.log("Dashboard user:", user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Header */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome back,{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {user?.name || "User"} 👋
        </span>
      </motion.h1>

      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Quick Notes */}
        <section>
          <QuickNotes />
        </section>

        {/* Modules */}
        <section>
          <h2 className="text-2xl font-semibold mb-5">📚 Modules History</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Machine Learning", level: "Intermediate" },
              { title: "Databases", level: "Beginner" },
            ].map((module, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <h3 className="font-bold text-lg text-purple-400">{module.title}</h3>
                <p className="text-gray-400 text-sm">
                  Difficulty: {module.level}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
