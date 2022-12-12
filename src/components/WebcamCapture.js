import React from "react";
import Webcam from "react-webcam";

import axios from "axios";
import { HOST } from "../envconfig";
import MyButton from "./MyButton";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ imageUpload }) => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const slice = imageSrc.slice(23, imageSrc.length);
        console.log(slice);
        let ret = await axios.post(HOST + "/App/", { image: slice });
        console.log(ret);
    }, [webcamRef]);
    return (
        <>
            <MyButton text={"Capture"} onClick={capture} />
            <MyButton text={"submit"} type={"POSITIVE"} />
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored={true}
            />
        </>
    );
};
