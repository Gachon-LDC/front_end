import axios from "axios";
import {API_URL} from "../../envconfig";


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
                console.log(err);
                console.log(err.response.data);
                alert(err.response.data);
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
            console.log(err);
            alert(err.response.data);
            return err;
        });

    return loginResult;
};

/* Logout */

export const logoutHandler = (email, pwd) => {
    const data = {
        email: email,
        pwd: pwd,
    };

    console.log(data);
    let res = axios
        .delete(`${API_URL}/api/auth`, { data })
        .then((res) => {
            alert(res.status);
            return res;
        })
        .catch((err) => {
            alert(err.status);
            console.log(err);
            return err;
        });

    return res;
};

/* Withdrawal user (회원탈퇴) */
export const withdrawalHandler = (email, pwd) => {
    const data = {
        email: email,
        pwd: pwd,
    };

    console.log(data);
    let withdrawalRes = axios
        .delete(`${API_URL}/api/auth/register`, data)
        .then((res) => {
            alert(res.status);
            return res;
        })
        .catch((err) => {
            alert(err.status);
            console.log(err);
            return err;
        });

    return withdrawalRes;
};
