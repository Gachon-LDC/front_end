import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

/* Register */

export const registerHandler = (email, pwd) => {
    const registerData = {
        email: email,
        pwd: pwd,
    };

    let registerResult = axios
        .post(`${API_URL}/api/auth/register`, registerData, { "Content-Type": "application/json" })
        .then((res) => {
            localStorage.setItem("isLoggedIn", true);
            return res;
        })
        .catch((err) => {
            if (err.response === 403) {
                alert("Invalid User");
            } else {
                alert(err);
            }
        });

    return registerResult;
};
