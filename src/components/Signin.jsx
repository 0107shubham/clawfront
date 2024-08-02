import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTodoById } from "../Redux/todosSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      // If the token exists, redirect to the home page
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://claw-three.vercel.app/signin",
        { email, password }
      );
      const { token } = response.data;
      Cookies.set("jwtToken", token, { expires: 7 }); // Set cookie with 7-day expiration
      Cookies.set("userId", response.data.user.id, { expires: 1 / 24 }); // Set cookie with 7-day expiration
      Cookies.set("userName", response.data.user.name, { expires: 1 / 24 }); // Set cookie with 7-day expiration
      navigate("/home");
      dispatch(fetchTodoById(response.data.user.id));
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <button
            onClick={handleSignup}
            className="text-red-500 underline cursor-pointer text-2xl"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
