import axios from "axios";
import { API_URL } from "../../envconfig";

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

export const postNewVideo = async (fps, file, content, title, dance) => {
    const res = await axios
        .post(`${API_URL}/api/videos/`)
        .then((res) => {
            console.log("postNewVideo : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const deleteVideo = async (id) => {
    const res = await axios
        .delete(`${API_URL}/api/videos/${id}`)
        .then((res) => {
            console.log("deleteVideo : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

/* Comment */

export const postComment = async (id, comment) => {
    const body = {
        content: comment,
    };
    const res = await axios
        .post(`${API_URL}/api/videos/${id}/comment`, body)
        .then((res) => {
            console.log("comment res : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getComments = async (id, setData) => {
    const res = await axios
        .get(`${API_URL}/api/videos/${id}/comment`)
        .then((res) => {
            console.log("comments : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));

    setData(res);
};

/*  Learn  */
export const getPhotoSimilarity = async (formData, video_id) => {
    const header = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    const res = await axios
        .post(`${API_URL}/api/videos/${video_id}/learn`, formData, header)
        .then((res) => {
            console.log("sim res : ", res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    return res;
};
export const getPhotoSimilarity2 = async (formData, video_id) => {
    const header = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    const res = await axios
        .post(`${API_URL}/api/videos/${video_id}/learn2`, formData, header)
        .then((res) => {
            console.log("sim res : ", res.data);
            return res;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    return res;
};
