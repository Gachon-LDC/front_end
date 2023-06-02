import React, { useEffect } from "react";
import Webcam from "react-webcam";

import axios from "axios";
import { HOST } from "../envconfig";
import MyButton from "./MyButton";
const videoConstraints = {
    width: 400,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ sendStart, learnComplete }) => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const slice = imageSrc.slice(23, imageSrc.length);
        console.log(slice);
        let ret = await axios.post(HOST + "/App/", { image: slice });
        console.log(ret);
    }, [webcamRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sendStart == true) {
                const imageSrc = webcamRef.current.getScreenshot();
                console.log("caputure!");
            }
        }, 1000);
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
        </div>
    );
};
