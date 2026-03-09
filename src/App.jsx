import {Routes, Route,BrowserRouter} from "react-router-dom"
import './App.css'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"


function App() {
  return(
    <BrowserRouter>
    {/* <Route path = '/' element = {} */}
    <Routes>
      <Route path = '/login' element= {<Login/>}/>
      <Route path = '/home' element= {<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App