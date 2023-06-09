import React, { createContext } from "react";

import { getVideos, getVideoById, postComment, getComments, getPhotoSimilarity } from "./video.service";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    return <VideoContext.Provider value={{ getVideos, getVideoById, postComment, getComments, getPhotoSimilarity }}>{children}</VideoContext.Provider>;
};
