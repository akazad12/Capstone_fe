import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Portfolio() {
  const navigate = useNavigate();
  
  const [watchlist, setWatchlist] = useState([]);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const getWatchlist = async() =>{
    try{
        const res = await axios.get(
            `http://localhost:3000/api/users/${userId}/watchlist`
        )
        setWatchlist(res.data.stocks)
    } catch(err){
        console.log(err)
    }
  }
  useEffect(() => {
    if (userId) {
      getWatchlist();
    }
  }, [userId]);

  return (
    <div>
      <h1>{userName}'s Portfolio</h1>
      {watchlist.length === 0 ? (
        <p>No stocks in your watchlist.</p>
      ) : (
        <ul>
          {watchlist.map((stock) => (
            <li key={stock._id}>
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={() => navigate("/watchlist")}>Go to Watchlist</button>
    </div>
  );
}

export default Portfolio;
