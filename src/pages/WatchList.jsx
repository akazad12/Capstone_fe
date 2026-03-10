import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function WatchList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const FKEY = import.meta.env.VITE_FKEY;
  //userId stored in local storage in login
  const userId = localStorage.getItem("userId");

  const searchStock = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/assets", {
        symbol: search,
      });

      setResults([res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWatchlist = async (symbol) => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/${userId}/watchlist/${symbol}`,
      );

      alert("Stock added to watchlist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Stock Watchlist</h1>

      <form onSubmit={searchStock}>
        <input
          type="text"
          placeholder="Search stock symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
        />

        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((stock) => (
          <li key={stock.symbol}>
            {stock.name} ({stock.symbol}) - ${stock.currentPrice}
            <button onClick={() => addToWatchlist(stock.symbol)}>Add</button>
            <button onClick={() => navigate(`/stock/${stock.symbol}`)}>
              Info
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/portfolio")}>Back to Portfolio</button>
    </div>
  );
}

export default WatchList;
