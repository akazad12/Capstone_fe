import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import '../styles/loginStyle.css'

function Login() {
  const navigate = useNavigate();
  const [mode,setMode] = useState("signup")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        mode === "signup"
          ? "http://localhost:3000/api/users/signup"
          : "http://localhost:3000/api/users/login";
      const payload =
        mode === "signup"
          ? { name, email, password }
          : { email, password };
      const res = await axios.post(endpoint, payload);
      console.log(res.data)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        //Used later to attach watchlist to porfolio
        localStorage.setItem("userId", res.data.user._id);
        //Used in porfolio page to get users name
        localStorage.setItem("userName", res.data.user.name);
        navigate("/portfolio");
        console.log("logged in", res.data);
      } else{
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error('error creating login',err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card">
        <h2>{mode === "signup" ? "Create Account" : "Login"} </h2>

        {mode === "signup" &&(
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        )}

        <input
          id="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}

        <button type="submit">{mode === "signup" ? "Signup" : "Login"}</button>
          <p className="switch">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setMode(mode === "signup" ? "login" : "signup")
            }
            style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
          >
            {mode === "signup" ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
}
export default Login;
