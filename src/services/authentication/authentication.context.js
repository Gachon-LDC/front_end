import React, { useState, createContext, useEffect } from "react";

import { registerHandler, loginHandler, withdrawalHandler, logoutHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLoggedIn"));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

    useEffect(() => {
        if (userData == null) {
            setUserData({ email: "null" });
        }
    }, [userData]);
    const onLogin = async (id, pwd) => {
        const loginRes = await loginHandler(id, pwd);
        console.log("loginRes : ", loginRes);
        if (loginRes.status == 201) {
            console.log(loginRes.status);
            console.log(loginRes.data);
            setUserData(loginRes.data);
            setIsLogin(true);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("email", id);
            localStorage.setItem("pwd", pwd);
            localStorage.setItem("userData", JSON.stringify(loginRes.data));
        }
    };

    const onLogout = () => {
        setUserData("");
        setIsLogin(false);
        logoutHandler(localStorage.getItem("email"), localStorage.getItem("pwd"));
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.removeItem("email");
        localStorage.removeItem("pwd");
        alert("로그아웃 되었습니다!");
    };

    return (
        <AuthenticationContext.Provider
            value={{
                registerHandler, // 회원가입 요청 핸들러
                onLogin, // 로그인시 호출 함수
                isLogin, // 로그인 상태
                userData,
                onLogout, // 로그아웃 호출 함수
                withdrawalHandler, //회원탈퇴
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
