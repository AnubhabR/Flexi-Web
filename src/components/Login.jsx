import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );

      // Store the token
      localStorage.setItem("token", res.data.token);

      // Store user role if provided
      if (res.data.user?.role) {
        localStorage.setItem("userRole", res.data.user.role);
      }

      // Store user data if provided
      if (res.data.user) {
        localStorage.setItem("userData", JSON.stringify(res.data.user));
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.msg || "Error logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-neutral-800">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 p-2 bg-red-50 rounded">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-amber-600 underline hover:text-amber-700"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
