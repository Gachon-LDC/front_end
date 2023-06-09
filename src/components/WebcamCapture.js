import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import axios from "axios";
import { HOST } from "../envconfig";
import MyButton from "./MyButton";
import { VideoContext } from "../services/video/video.context";
const videoConstraints = {
    width: 400,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ sendStart, learnComplete, id }) => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const slice = imageSrc.slice(23, imageSrc.length);
        console.log(slice);
        let ret = await axios.post(HOST + "/App/", { image: slice });
        console.log(ret);
    }, [webcamRef]);

    const frame = useRef(0);
    const [similarities, setSimilarities] = useState([]);
    const { getPhotoSimilarity } = useContext(VideoContext);

    const getSimRequest = async (formData) => {
        const sim = await getPhotoSimilarity(formData, id);
        console.log(sim);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (sendStart == true) {
                const imageSrc = webcamRef.current.getScreenshot();
                console.log("caputure! :", frame.current);
                setSimilarities([...similarities, imageSrc]);
                const formData = new FormData();
                formData.append("image", imageSrc);
                formData.append("nframe", frame);
                getSimRequest(formData);
                frame.current += 1;
            }
        }, 100);
        if (learnComplete == true) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [sendStart, learnComplete]);

    useEffect(() => {}, [learnComplete]);

    return (
        <div className="WebcamCapture">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} mirrored={true} />
            {/* <MyButton text={"Capture"} onClick={capture} />
            <MyButton text={"submit"} type={"POSITIVE"} /> */}
            {similarities.toString()}
        </div>
    );
};
