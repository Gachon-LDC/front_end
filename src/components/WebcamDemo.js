import React, { useRef } from "react";

const CONSTRAINTS = { video: true };

export const WebcamDemo = () => {
    const videoRef = useRef < HTMLVideoElement > null;

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
        }
    };

    return (
        <div className="WebcamDemo">
            <video autoPlay ref={videoRef} />
            <button onClick={startVideo}>start</button>
        </div>
    );
};
