import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({
            token: null,
            userId: null
        });
    };

    const toggleMenu = (event) => {
        event.target.classList.add('open')
    }

    return (
        <div>
            <div>
                <header className="header">
                    <Link to="/" className="logo"><img src="../../schoolr1.png" alt="" /></Link>
                    <div className="menu-btn" onClick={toggleMenu}>
                        <div className="menu-burger"></div>
                    </div>
                    <nav className="navbar flex-nav" id="navbar">
                        <Link to="/">Home</Link>
                        {auth.token ? (
                            <>
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                            <Link to="/profile">Profile</Link>
                            </>
                        ) : (
                            <>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                            </>
                        )}
                    </nav>
                </header>
                <Outlet />
            </div>
        </div>  
    );
}

export default NavBar;