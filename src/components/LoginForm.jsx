import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import useUsers from "../hooks/use-users.js";
import useAuth from "../hooks/use-auth.js";

function LoginForm() {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { users, isLoading, error } = useUsers();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    let userId = "";

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                userId = users.find((user) => user.username == credentials.username).id;
                window.localStorage.setItem("id:", userId);
                setAuth({
                    token: response.token,
                    id: userId,
                });
                navigate("/");
            });
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type = "text"
                    id = "username"
                    placeholder = "Enter username"
                    onChange = {handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type = "password"
                    id = "password"
                    placeholder = "Password"
                    onChange = {handleChange}
                />
            </div>
            <button type = "submit" onClick = {handleSubmit}>
                Login
            </button>
        </form>
    );
}

export default LoginForm;