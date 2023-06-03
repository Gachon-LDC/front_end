import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getVideos = async (setData) => {
    const res = await axios
        .get(`${API_URL}/api/videos`)
        .then((res) => {
            console.log("getVideos : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));

    setData(res);
};

export const getVideoById = async (id, setData) => {
    const res = await axios
        .get(`${API_URL}/api/videos/${id}`)
        .then((res) => {
            console.log("getVideoId : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));

    setData(res);
};
