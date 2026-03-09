import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/logStyles.css'

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "http://localhost:5001/api/users/signup";
      const payload = { username, email, password };
      const res = await axios.post(endpoint, payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      console.log("logged in", res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h2>Create Account </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
export default Signup;
