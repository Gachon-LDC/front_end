import axios from "axios";
import {API_URL} from "../../envconfig";


export const getDanceCategory = async () => {
    let res = await axios
        .get(`${API_URL}/api/category`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((e) => console.log(e));
    return res;
};

export const postDanceCategory = async ({ category }) => {
    const data = {
        title: category,
    };
    let res = await axios
        .post(`${API_URL}/api/category`, data)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((e) => console.log(e));
    return res;
};
