import { createContext, useContext } from "react";
import { getDanceCategory, postDanceCategory } from "./danceCategory.service";

export const DanceCategoryContext = createContext();

export const DanceCategoryContextProvider = ({ children }) => {
    return <DanceCategoryContext.Provider value={{ getDanceCategory, postDanceCategory }}>{children}</DanceCategoryContext.Provider>;
};
