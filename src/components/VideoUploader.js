import React, { useState } from "react";
import styled from "styled-components";

const VideoUploader = ({ file, setFile }) => {
    const [url, setURL] = useState();
    const convertBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };
        });
    };
    const imageUpload = (e) => {
        const imageTpye = e.target.files[0].type.includes("image");
        const videoTpye = e.target.files[0].type.includes("video");

        convertBase64(e.target.files[0]).then((res) =>
            setFile({
                data: res,
                image: imageTpye,
                video: videoTpye,
            })
        );
    };

    return (
        <Wrap className="Video_Uploader">
            <input type="file" onChange={imageUpload} />
            {file.image && (
                <>
                    <img className="content" src={file.data} width="600" />
                </>
            )}
            {file.video && (
                <video
                    className="content"
                    src={file.data}
                    controls
                    width="350px"
                />
            )}
            <div id="Webcam" width="350px" height="350px" />
            {/* {ReactDOM.render(<Webcam />, document.getElementById("Webcam"))} */}
            {/* <WebcamStreamCapture /> */}
            {/* <WebcamCapture imageUpload={imageUpload} />
            위 컴포넌트가 사진찍고 저장하는 컴포넌트임 */}
        </Wrap>
    );
};

export default VideoUploader;

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
