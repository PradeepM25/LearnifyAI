import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to CourseGPT
        </h1>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Your personal AI-powered learning assistant 🚀.  
          Get <span className="text-indigo-400 font-semibold">Quick Notes</span> for any topic 
          or generate <span className="text-purple-400 font-semibold">Step-by-Step Modules</span> 
          tailored to your preferred difficulty level.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
        {/* Card 1 */}
        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-indigo-400">📝 Quick Notes</h2>
          <p className="mt-3 text-gray-300">
            Instantly generate concise and clear notes on any topic. 
            Perfect for revision or quick learning.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-purple-400">📚 Modules</h2>
          <p className="mt-3 text-gray-300">
            Break down topics into structured modules based on difficulty. 
            Learn at your own pace with AI guidance.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-12 flex gap-6">
        {user ? (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-md transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-md transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold shadow-md transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
