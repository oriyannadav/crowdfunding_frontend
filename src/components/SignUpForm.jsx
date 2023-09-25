import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postSignUp from "../api/post-signup.js";

import useAuth from "../hooks/use-auth.js";
import useUsers from "../hooks/use-users.js";

function SignUpForm() {

    const navigate = useNavigate();
    const {setAuth} = useAuth();
    const { users } = useUsers();

    const [credentials, setCredentials] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));

        if (id === "username") {
            const isUsernameTaken = users.some((user) => user.username === value);
            if (isUsernameTaken) {
                setError("Username is already taken");
            } else {
                setError(null);
            }
        }
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (credentials.username && credentials.password) {
    //         postSignUp(
    //             credentials.first_name,
    //             credentials.last_name,
    //             credentials.email,
    //             credentials.username,
    //             credentials.password
    //             ).then((response) => {
    //             window.localStorage.setItem("token", response.token);
    //             setAuth({
    //                 token: response.token,
    //             });
    //             navigate("/login");
    //         });
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (error) {
            // Username is already taken
            return;
        }

        setError(null)

        if (credentials.username && credentials.password) {
            try {
                const response = await postSignUp(credentials);

                window.localStorage.setItem("token", response.token);
                setAuth({
                    token: response.token,
                });
                navigate("/login");
            } catch (error) {
                setError("Signup failed. Please try again."); // Handle API errors
            }
        }
    };

    return (
        <form>
            <div className="inline-container">
                <div className="input-container">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type = "text"
                        id = "first_name"
                        placeholder = "Enter first name"
                        onChange = {handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type = "text"
                        id = "last_name"
                        placeholder = "Enter last name"
                        onChange = {handleChange}
                    />
                </div>
            </div>
            <div className="inline-container">
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input
                        type = "email"
                        id = "email"
                        placeholder = "Enter email"
                        onChange = {handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="username">Username:</label>
                    <input
                        type = "text"
                        id = "username"
                        placeholder = "Enter username"
                        onChange = {handleChange}
                    />
                </div>
            </div>
            <div className="inline-container">
                <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type = "password"
                        id = "password"
                        placeholder = "Password"
                        onChange = {handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        />
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type = "submit" onClick = {handleSubmit}>
                Sign Up
            </button>
        </form>
    );
}

export default SignUpForm;