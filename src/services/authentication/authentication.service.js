import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

/* Register */

export const registerHandler = (email, pwd, setShow) => {
    const registerData = {
        email: email,
        pwd: pwd,
    };

    let registerResult = axios
        .post(`${API_URL}/api/auth/register`, registerData, { "Content-Type": "text/plain" })
        .then((res) => {
            alert("회원가입에 성공하였습니다!");
            setShow(false);
            return res;
        })
        .catch((err) => {
            if (err.response.status === 409) {
                console.log(err.response);
                console.log(err.response.data);
                console.log(err.response.status);
                alert("이미 존재하는 계정입니다.");
            } else {
                console.log(err.response.data);
                console.log(err.response.status);
            }
        });

    return registerResult;
};

/* Login */

export const loginHandler = (email, pwd) => {
    const loginData = {
        email: email,
        pwd: pwd,
    };

    let loginResult = axios
        .post(`${API_URL}/api/auth`, loginData, { "Content-Type": "application/json" })
        .then((res) => {
            alert("로그인에 성공하였습니다!");
            console.log(res.data);
            console.log(res.status);
            return res;
        })
        .catch((err) => {
            console.log(err.response.data);
            console.log(err.response.status);
            alert(err.response.data);
        });

    return loginResult;
};
