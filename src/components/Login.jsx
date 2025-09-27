import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/dashboard'); // 3. Redirect to the dashboard
    } catch (err) {
      console.error(err.response.data);
      alert('Error logging in.');
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-neutral-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          className="w-full mb-6 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-amber-600 underline">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;