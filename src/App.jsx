import {Routes, Route,BrowserRouter} from "react-router-dom"
import './App.css'
import SignUp from "./pages/login.jsx"

function App() {
  return(
    <BrowserRouter>
    {/* <Route path = '/' element = {} */}
    <Routes>
      <Route path = '/' element= {<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App