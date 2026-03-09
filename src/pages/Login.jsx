import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/loginStyle.css'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "http://localhost:3000/api/users/signup";
      const payload = { name, email, password };
      const res = await axios.post(endpoint, payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      console.log("logged in", res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error('error creating login',err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card">
        <h2>Create Account </h2>
        <input
        //   id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
        //   id="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
        //   id="password"
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
