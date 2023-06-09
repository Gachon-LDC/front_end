import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import axios from "axios";
import { HOST } from "../envconfig";
import MyButton from "./MyButton";
import { VideoContext } from "../services/video/video.context";
import { Button } from "react-bootstrap";
const videoConstraints = {
    width: 400,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ sendStart, learnComplete, id }) => {
    const webcamRef = React.useRef(null);
    const [similarities, setSimilarities] = useState([]);
    const [img, setImg] = useState();

    // getPhotoSimilarity : "image"
    // getPhotoSimilarity2 : "base64"
    const { getPhotoSimilarity, getPhotoSimilarity2 } = useContext(VideoContext);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
        // const blob = DataURIToBlob(imageSrc);
        // const blob = await fetch(imageSrc).then((res) => res.blob());
        // console.log("blob :", blob);
        // return blob;

        // console.log(imageSrc);
        return imageSrc;

        // return blob;
    }, [webcamRef]);

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(",");
        const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
    }

    const getSimRequest = async (formData) => {
        const sim = await getPhotoSimilarity2(formData, id);
        console.log(sim);
    };
    let frame = 0;
    useEffect(() => {
        const interval = setInterval(() => {
            if (sendStart == true) {
                const imageSrc = capture();
                // console.log("caputure! :", frame, imageSrc);
                // setSimilarities([...similarities, imageSrc]);

                const formData = new FormData();
                formData.append("image", imageSrc);
                formData.append("nframe", frame);

                // for (var value of formData.values()) {
                //     console.log("fd", value);
                // }
                getSimRequest(formData);

                frame += 1;
            }
        }, 1000);
        if (learnComplete == true) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [sendStart, learnComplete]);

    return (
        <div className="WebcamCapture">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" videoConstraints={videoConstraints} mirrored={true} />
            {/* <Button text={"Capture"} onClick={capture}>
                캡쳐
            </Button> */}
            {/* <img width={"200px"} src={`data:image/png;base64,${img}`} /> */}
            {/* {similarities.toString()} */}
        </div>
    );
};
