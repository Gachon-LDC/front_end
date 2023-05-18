import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

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
