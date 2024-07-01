"use client";

import { useState } from "react";
import { setToken } from "@/redux/auth/auth.slice";
import useAuthSession from "../hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import { error } from "console";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const handleLogin = async () => {
    // Implement the logic to authenticate the user
    if (!username && password) {
      setErrors({...errors, username: "username can't be empty"});
      return;
    }
    if (username && !password) {
      setErrors({...errors, password: "password can't be empty"});
      return;
    }
    if (!username && !password) {
      setErrors({password: "password can't be empty", username: "username can't be empty"});
      return;
    }
    
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username: username,
      password: password,
    });
    dispatch(setToken(response.data.token));
  };

  const handleUsername = (e: any)=>{
      if(errors.username) setErrors({...errors, username: ""});
      setUsername(e.target.value);
  }

  const handlePassword = (e: any)=>{
    if(errors.password) setErrors({...errors, password: ""});
    setPassword(e.target.value);
}

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">
              Welcome, {user.username}
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-black">Login</h2>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors.username && (
              <span className="w-full px-1 text-red-500">{errors.username}</span>
            )}
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors.password && (
              <span className="w-full px-1 text-red-500">{errors.password}</span>
            )}
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">
            The hook should be usable like this:{" "}
          </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
