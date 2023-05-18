import React, { useState, createContext } from "react";

import { registerHandler, loginHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [uid, setUid] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [userEmail, setUserEmail] = useState();

    const onLogin = async (id, pwd) => {
        const loginRes = await loginHandler(id, pwd);
        console.log(loginRes);
        if (loginRes.status == 201) {
            console.log(loginRes.status);
            setUid(loginRes.data.uid);
            setUserEmail(loginRes.data.email);
            setIsLogin(true);
        }
    };

    const onLogout = () => {
        setUid("");
        setIsLogin(false);
        alert("로그아웃 되었습니다!");
    };

    return (
        <AuthenticationContext.Provider
            value={{
                registerHandler, // 회원가입 요청 핸들러
                onLogin, // 로그인시 호출 함수
                isLogin, // 로그인 상태
                uid,
                userEmail,
                onLogout, // 로그아웃 호출 함수
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
