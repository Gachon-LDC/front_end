import { useContext, useState } from "react";
import { DanceCategoryContext } from "../services/danceCategory/danceCategory.context";

export const CategoryBar = () => {
    const [categories, setCategories] = useState([]);
    const { getDanceCategory } = useContext(DanceCategoryContext);
    const initializeCategories = async () => {
        setCategories(await getDanceCategory);
    };
    useState(() => {
        initializeCategories();
    }, []);
    return <div>category</div>;
};
