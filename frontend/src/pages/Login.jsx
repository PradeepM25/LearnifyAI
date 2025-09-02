import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const userData = await login(form).unwrap();
  dispatch(setCredentials(userData)); // userData includes token
  console.log("Login successful:", userData);
  navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">
            {error?.data?.message || "Login failed"}
          </p>
        )}

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
