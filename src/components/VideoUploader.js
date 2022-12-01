import React, { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { WebcamStreamCapture } from "./WebcamStreamCapture";

const VideoUploader = () => {
    const [file, setFile] = useState({});

    const imageUpload = (e) => {
        const imageTpye = e.target.files[0].type.includes("image");
        const videoTpye = e.target.files[0].type.includes("video");

        setFile({
            url: URL.createObjectURL(e.target.files[0]),
            image: imageTpye,
            video: videoTpye,
        });
        console.log(imageTpye);
    };

    return (
        <Wrap className="Video_Uploader">
            <input type="file" onChange={imageUpload} />
            {file.image && <img className="content" src={file.url} />}
            {file.video && (
                <video
                    className="content"
                    src={file.url}
                    controls
                    width="350px"
                />
            )}
            <div id="Webcam" width="350px" height="350px" />
            {/* {ReactDOM.render(<Webcam />, document.getElementById("Webcam"))} */}
            <WebcamStreamCapture />
        </Wrap>
    );
};

export default VideoUploader;

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
