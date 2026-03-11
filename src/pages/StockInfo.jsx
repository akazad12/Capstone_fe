import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function StockInfo() {
    // gets stock id from the url
  const { id } = useParams(); 
  const navigate = useNavigate(); 

    // state is used to store stock data
  const [stock, setStock] = useState(null);
    // state is used to store the realtime price of the stock
  const [currentPrice,setCurrentPrice] = useState(null)
  const FKEY = import.meta.env.VITE_FKEY;

  useEffect(() => {
      const fetchStock = async () => {
      try {
        // Get stock metadata from DB
        const res = await axios.get(`http://localhost:3000/api/assets/${id}`);
        const stockData = res.data;
        setStock(stockData);

        // Get live price from Finnhub
        const quoteRes = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${stockData.symbol}&token=${FKEY}`
        );
        setCurrentPrice(quoteRes.data.c);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStock();
  }, [id]);

  //message shown if stock is not found
  if (!stock) return <p>Stock not found</p>;


  return (
    //all data being displayed on the frontend
    <div>
      <h1>{stock.name} ({stock.symbol})</h1>
      <p>Price: ${currentPrice}</p>
      <p>Exchange: {stock.exchange}</p>
      <p>Sector: {stock.sector}</p>
      <p>Market Cap: {stock.marketCap}</p>
       <button onClick={() => navigate("/watchlist")}>Back to Watchlist</button>
    </div>
    
  );
}

export default StockInfo;