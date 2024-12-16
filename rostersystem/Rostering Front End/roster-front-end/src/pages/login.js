import React, { useState } from "react";
import "../style/App.css";
import { setToken } from "../auth/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  async function logIn() {
    const url = `http://localhost:3001/user/signin`;
    const args = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    };

    try {
      setLoading(true);
      setMessage("");
      setError(false);

      const response = await fetch(url, args);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setToken(data.token);
      setMessage("Successfully Logged In!");
      setError(false);

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setMessage("Failed to log in. Please check your credentials.");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {message && (
          <p className={error ? "error-message" : "success-message"}>{message}</p>
        )}

        <button onClick={logIn} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
