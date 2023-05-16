import React, { useState, createContext } from "react";

import { registerHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    return (
        <AuthenticationContext.Provider
            value={{
                registerHandler, // 회원가입 요청 핸들러
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
