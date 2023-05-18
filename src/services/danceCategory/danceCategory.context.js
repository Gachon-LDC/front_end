import { createContext, useContext } from "react";
import { getDanceCategory } from "./danceCategory.service";

export const DanceCategoryContext = createContext();

export const DanceCategoryContextProvider = ({ children }) => {
    return <DanceCategoryContext.Provider value={getDanceCategory}>{children}</DanceCategoryContext.Provider>;
};
