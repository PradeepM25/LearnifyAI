import { useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering user:", form);
  const userData = await register(form).unwrap();
  dispatch(setCredentials(userData)); // userData includes token
  navigate("/dashboard");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition shadow-lg"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">
            {error?.data?.message || "Registration failed"}
          </p>
        )}

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
