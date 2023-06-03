import React, { createContext } from "react";

import { CreateSurvey } from "./video.service";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    return <VideoContext.Provider value={{}}>{children}</VideoContext.Provider>;
};
