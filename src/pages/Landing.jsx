import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function LandingPage(){
    const navigate = useNavigate();

    return(
        <div className = 'landing-container'>
            <h1>Stock Porfolio Tracker</h1>
            <h2>Create a watchlist of your favorite stocks</h2>
            
            <div className = 'landing-buttons'>
                <button onClick ={() => navigate('/login')}>
                    Login
                </button>

                <button onClick ={() => navigate('/signup')}>
                    Sign Up
                </button>
            </div>
        </div>
    )
}
export default LandingPage;