import React from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import ReactDOM from "react-dom";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ imageUpload }) => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    }, [webcamRef]);
    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={600}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};
