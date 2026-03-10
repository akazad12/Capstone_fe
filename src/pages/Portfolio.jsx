import { useNavigate } from "react-router-dom";

function Portfolio() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Portfolio</h1>

      <button onClick={() => navigate("/watchlist")}>Go to Watchlist</button>
    </div>
  );
}

export default Portfolio;
