import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
        <div>
            <div>
                <header className="header">
                    <Link to="/" className="logo"><img src="../../public/logo2.png" alt="" /></Link>
                    <div className="menu-btn">
                        <div className="menu-burger"></div>
                    </div>
                    <nav className="navbar flex-nav" id="navbar">
                        <Link to="/">Home</Link>
                        {auth.token ? (
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                        ) : (
                            
                            <Link to="/login">Login</Link>
                        )}
                        <Link to="/signup">Sign Up</Link>
                    </nav>
                </header>
                <Outlet />
            </div>
        </div>  
    );
}

export default NavBar;