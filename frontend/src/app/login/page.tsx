"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // router allows us to programmatically change pages
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading animation and change button text

    try {
      // 1. Send the data to your FastAPI backend
      const response = await fetch("https://ai-interview-platform-vlvl.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // 2. If the backend says the password matches...
      if (response.ok) {
        // We now capture the JWT token passed back from the FastAPI server
        localStorage.setItem("token", data.token);
        
        alert("Login Successful!");
        router.push("/dashboard");
      } else {
        // If password/email is wrong, show the FastAPI error message
        alert(data.detail);
      }
    } catch (error) {
      console.error(error);
      alert("Network error connecting to backend.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px]">
        
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-black p-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Waking up secure server (this may take 30s)..." : "Login"}
        </button>

      </div>
    </div>
  );
}