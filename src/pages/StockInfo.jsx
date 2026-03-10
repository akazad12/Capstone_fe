import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function StockInfo() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/assets",
          { symbol }
        );

        setStock(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchStock();
  }, [symbol]);

  if (!stock) return <p>Loading...</p>;

  return (
    <div>
      <h1>{stock.name}</h1>

      <p>Symbol: {stock.symbol}</p>
      <p>Price: ${stock.currentPrice}</p>
      <p>Exchange: {stock.exchange}</p>
      <p>Sector: {stock.sector}</p>
      <p>Market Cap: {stock.marketCap}</p>

      <button onClick={() => navigate("/watchlist")}>
        Back
      </button>
    </div>
  );
}

export default StockInfo;