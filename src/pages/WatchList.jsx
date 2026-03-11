import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/watchlist.css";

import axios from "axios";

function WatchList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); //stores search inputs
  const [results, setResults] = useState([]); //stores search results
  const [watchlist, setWatchlist] = useState([]); //users watchlist
  const [assets, setAssets] = useState([]); //All stocks in the database
  const [error, setError] = useState(""); //Error messages

  const FKEY = import.meta.env.VITE_FKEY; //Finnhub API key

  const userId = localStorage.getItem("userId"); //userId stored in local storage in login

  //checks if the market is currently open
  const isMarketOpen = () => {
    const now = new Date();
    const day = now.getDay();
    //0=sunday,6=saturday
    if (day === 0 || day === 6) return false;

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentTime = hours * 60 + minutes;
    const openTime = 9 * 60 + 30; //market opens at 9:30am
    const closeTIme = 26 * 60; //market closes at 4pm

    return currentTime >= openTime && currentTime <= closeTIme;
  };

  //updates stock prices in the watchlist
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
  //Fetches current users watchlist from db
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

  //Fetches all assets from the db to display in dropdown
  const getAssets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/assets");
      setAssets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Fetches all assets
  useEffect(() => {
    getAssets();
  }, []);

  //Fetches users watchlist when userId exists
  useEffect(() => {
    if (userId) {
      userWatchlist();
    }
  }, [userId]);

  //updates watchlist prices every 30 seconds if market is open
  useEffect(() => {
    if (watchlist.length === 0) return;

    if (!isMarketOpen) return;

    const interval = setInterval(() => {
      updatePrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [watchlist]);

  //searches
  const searchStock = async (e) => {
    e.preventDefault();
    try {
      // Get the users watchlist from datbase
      const watchlistRes = await axios.get(
        `http://localhost:3000/api/users/${userId}/watchlist`,
      );

      let stocks = watchlistRes.data?.stocks || [];
      let stockFromDB = stocks.find((stock) => stock.symbol === search);

      //if stock is not in the db add stock to the db
      if (!stockFromDB) {
        try {
          const addRes = await axios.post("http://localhost:3000/api/assets", {
            symbol: search,
          });

          stockFromDB = addRes.data;
        } catch (err) {
          setResults([]);
          setError("Stock not found");
          return;
        }
      }
      // Get the live price from Finnhub
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockFromDB.symbol}&token=${FKEY}`,
      );
      setError("");
      // Combine the data and set results
      setResults([{ ...stockFromDB, currentPrice: quote.data.c }]);
    } catch (err) {
      console.log("Error fetching or adding stock:", err);
    }
  };
  //add stock to users watchlist
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
  //remove single stock from users watchlist
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
      {/* Search section */}
      <div className="search-section">
        <h2>Search Stock</h2>

        <form onSubmit={searchStock} className="search-column">
          <input
            type="text"
            placeholder="Ticker (AAPL)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.toUpperCase());
              setError("");
            }}
          />

          {/* Dropdown to select existing stock in db */}
          <select onChange={(e) => setSearch(e.target.value)} defaultValue="">
            <option value="">Select Stock</option>

            {assets.map((asset) => (
              <option key={asset._id} value={asset.symbol}>
                {asset.symbol} - {asset.name}
              </option>
            ))}
          </select>

          <button type="submit">Search</button>
        </form>
        {error && <p className="error-message">{error}</p>}

            {/* Display search result */}
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

        {/* Watchlist section */}
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
      </div>
    </div>
  );
}
export default WatchList;
