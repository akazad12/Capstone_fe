import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Portfolio() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");



  return (
    <div>
      <h1>{userName}'s Portfolio</h1>
      
      <button onClick={() => navigate("/watchlist")}>Go to Watchlist</button>
    </div>
  );
}

export default Portfolio;
