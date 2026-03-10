import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/watchlist.css";

import axios from "axios";

function WatchList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const FKEY = import.meta.env.VITE_FKEY;
  //userId stored in local storage in login
  const userId = localStorage.getItem("userId");

  const isMarketOpen = ()=>{
    const now = new Date();
    const day = now.getDay()
    //0=sunday,6=saturday
    if (day === 0 || day === 6) return false;

    const hours = now.getHours()
    const minutes = now.getMinutes()

    const currentTime = hours*60+minutes;
    const openTime = 9*60+30; //market opens at 9:30am
    const closeTIme = 26*60;    //market closes at 4pm

    return currentTime >= openTime && currentTime <=closeTIme;
  }
  const updatePrices = async () => {
    if (watchlist.length === 0) return;

    try {
      const updated = await Promise.all(
        watchlist.map(async (stock) => {
          const quote = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${FKEY}`,
          );

          return { ...stock, currentPrice: quote.data.c };
        }),
      );

      setWatchlist(updated);
    } catch (err) {
      console.log("Error updating prices:", err);
    }
  };

  const userWatchlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${userId}/watchlist`,
      );
      setWatchlist(res.data.stocks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      userWatchlist();
    }
  }, [userId]);
  useEffect(() => {
    if (watchlist.length === 0) return;
    
    if (!isMarketOpen) return;
    
    const interval = setInterval(() => {
      updatePrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [watchlist]);

  const searchStock = async (e) => {
    e.preventDefault();
    try {
      // Get the current watchlist from datbase
      const watchlistRes = await axios.get(
        `http://localhost:3000/api/users/${userId}/watchlist`,
      );
      // Get the symbol from the serve
      let stocks = watchlistRes.data?.stocks || [];
      let stockFromDB = stocks.find(
        (stock) => stock.symbol === search,
      );

      // If stock not found, add it to the database
      if (!stockFromDB) {
        const addRes = await axios.post(`http://localhost:3000/api/assets`, {
          symbol: search,
        });

        // Stock data from database
        stockFromDB = addRes.data;
      }

      // Get the live price from Finnhub
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockFromDB.symbol}&token=${FKEY}`,
      );

      // Combine the data and set results
      setResults([{ ...stockFromDB, currentPrice: quote.data.c }]);
    } catch (err) {
      console.log("Error fetching or adding stock:", err);
    }
  };

  const addToWatchlist = async (assetId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/${userId}/watchlist/${assetId}`,
      );

      userWatchlist();
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWatchlist = async (assetId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/${userId}/watchlist/${assetId}`,
      );
      userWatchlist();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="watchlist-container">
      <div className="search-section">
        <h2>Search Stock</h2>

        <form onSubmit={searchStock}>
          <input
            type="text"
            placeholder="Ticker (AAPL)"
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
          />

          <button type="submit">Search</button>
        </form>

        {results.length > 0 && (
          <div>
            <h3>{results[0].name}</h3>
            <p>
              {results[0].symbol} - ${results[0].currentPrice}
            </p>

            <button onClick={() => addToWatchlist(results[0]._id)}>Add</button>
            <button onClick={() => navigate(`/stock/${results[0]._id}`)}>
              Info
            </button>
          </div>
        )}
      </div>

      <div className="watchlist-section">
        <h2>Your Watchlist</h2>

        {watchlist.length === 0 ? (
          <p>No stocks in your watchlist.</p>
        ) : (
          <ul>
            {watchlist.map((stock) => (
              <li key={stock._id}>
                {stock.name} ({stock.symbol}) - ${stock.currentPrice}
                <button onClick={() => removeFromWatchlist(stock._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate("/portfolio")}>Go to Portfolio</button>
      </div>
    </div>
  );
}
export default WatchList;
