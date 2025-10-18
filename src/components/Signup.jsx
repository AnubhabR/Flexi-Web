import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to start learning
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-xl bg-white p-4 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)]">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-6">
            <div className="rounded-xl bg-gray-100 p-2 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)]">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="rounded-xl bg-gray-100 p-2 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)]">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="rounded-xl bg-gray-100 p-2 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)]">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="rounded-xl bg-gray-100 p-2 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)]">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none appearance-none cursor-pointer"
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 
            shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)] 
            hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] 
            active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)] 
            transition-all duration-200"
          >
            Create Account
          </button>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <a
                href="/login"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
