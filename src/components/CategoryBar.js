import { useContext, useState } from "react";
import { DanceCategoryContext } from "../services/danceCategory/danceCategory.context";
import "./css/CategoryBar.css";
import { Button } from "react-bootstrap";
export const CategoryBar = () => {
    const [categories, setCategories] = useState();
    const { getDanceCategory } = useContext(DanceCategoryContext);
    const initializeCategories = async () => {
        let res = await getDanceCategory();
        console.log(res);
        setCategories(res);
    };
    useState(() => {
        initializeCategories();
    }, []);

    return (
        <div className="CategoryBar">
            {categories == undefined
                ? null
                : categories.map((it) => (
                      <Button className="category" variant="outline-success" key={it.uid} uid={it.uid} onClick={() => {}}>
                          {it.title}
                      </Button>
                  ))}
        </div>
    );
};
