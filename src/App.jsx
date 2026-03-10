import {Routes, Route,BrowserRouter} from "react-router-dom"
import './App.css'
import LandingPage from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import Watchlist from "./pages/WatchList.jsx"
import Portfolio from "./pages/Portfolio.jsx"
import StockInfo from "./pages/StockInfo.jsx"




function App() {
  return(
    <BrowserRouter>
    {/* <Route path = '/' element = {} */}
    <Routes>
      <Route path = '/landingPage' element={<LandingPage/>}/>
      <Route path = '/login' element= {<Login/>}/>
      <Route path = '/signup' element= {<Login/>}/>
      <Route path = '/portfolio' element={<Portfolio />} />
      <Route path = '/watchlist' element= {<Watchlist/>}/>
      <Route path = 'stock/:id' element= {<StockInfo/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App