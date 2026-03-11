import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Portfolio() {
    //used to navigate to diff routes
  const navigate = useNavigate();

   //state to store users stock watchlist
  const [watchlist, setWatchlist] = useState([]);

    //user info obtained from local storage
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

    //user watchlist is fetched from the backend
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

  //runs when the userId changes
  //if condition runs getWatchList function if user is logged in
  useEffect(() => {
    if (userId) {
      getWatchlist();
    }
  }, [userId]);

  return (
    <div>
        {/* displays users name */}
      <h1>{userName}'s Portfolio</h1>

        {/* shows message if list is empty */}
      {watchlist.length === 0 ? (
        <p>No stocks in your watchlist.</p>
      ) : (
        // render watchlist as a list
        <ul style={{ listStyle: "none", padding: 0 }}>
          {watchlist.map((stock) => (
            <li key={stock._id}>
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
      {/* button to direct user to watchlist */}
      <button onClick={() => navigate("/watchlist")}>Go to Watchlist</button>
    </div>
  );
}

export default Portfolio;
