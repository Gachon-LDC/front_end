import React, { createContext } from "react";

import { getVideos, getVideoById } from "./video.service";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    return <VideoContext.Provider value={{ getVideos, getVideoById }}>{children}</VideoContext.Provider>;
};
