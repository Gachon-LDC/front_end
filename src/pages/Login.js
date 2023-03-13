import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Perform login logic here
        setLoggedIn(true);
        {
            setTimeout(() => {
                navigate("/home", { replace: true });
            }, 2000);
        }
    };

    const handleLogout = () => {
        // Perform logout logic here
        setLoggedIn(false);
    };

    if (loggedIn) {
        return (
            <div>
                <p>You are logged in as {username}.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
