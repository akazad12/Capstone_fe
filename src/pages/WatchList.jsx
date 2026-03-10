import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function WatchList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const FKEY = import.meta.env.VITE_FKEY;
  const userId = localStorage.getItem("userId");
  console.log(FKEY, import.meta.env.FKEY);

  const searchStock = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/search?q=${search}&token=${FKEY}`,
      );

      setResults(res.data.result);
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
            {stock.description} ({stock.symbol})
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/portfolio")}>Back to Portfolio</button>
    </div>
  );
}

export default WatchList;
