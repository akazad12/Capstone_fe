import {Routes, Route,BrowserRouter} from "react-router-dom"
import './App.css'
import Login from "./pages/Login.jsx"
import Watchlist from "./pages/WatchList.jsx"
import Portfolio from "./pages/Portfolio.jsx"



function App() {
  return(
    <BrowserRouter>
    {/* <Route path = '/' element = {} */}
    <Routes>
      <Route path = '/login' element= {<Login/>}/>
      <Route path= '/portfolio' element={<Portfolio />} />
      <Route path = '/watchlist' element= {<Watchlist/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App