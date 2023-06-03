import React, { createContext } from "react";

import { getVideos } from "./video.service";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    return <VideoContext.Provider value={{ getVideos }}>{children}</VideoContext.Provider>;
};
