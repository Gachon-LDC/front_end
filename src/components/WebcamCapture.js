import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import axios from "axios";
import { HOST, PASS } from "../envconfig";
import MyButton from "./MyButton";
import { VideoContext } from "../services/video/video.context";
import { Button } from "react-bootstrap";
const videoConstraints = {
    width: 400,
    height: 720,
    facingMode: "user",
};

export const WebcamCapture = ({ sendStart, learnComplete, id, frameInterval, webcamRef, fps, setResLoading, duration, setLearnPercent, setCurFrame }) => {
    // const [similarities, setSimilarities] = useState([]);
    let similarities = [];

    const [img, setImg] = useState();

    const { getPhotoSimilarity, getPhotoSimilarity2 } = useContext(VideoContext);

    const getSimRequest = async (formData) => {
        const sim = await getPhotoSimilarity(formData, id);
        return sim;
    };
    const getSimRequest2 = async (formData) => {
        const sim = await getPhotoSimilarity2(formData, id);
    };

    let frame = 0;
    let allres = [];
    // 프레임 단위로 이미지를 전송하는 코드
    useEffect(() => {
        const interval = setInterval(async () => {
            if (sendStart == true) {
                // console.log(frame);
                frame += 1;
                if (frame % fps === 0 || frame % fps === Math.floor(fps / 2)) {
                    const nowFrame = frame;
                    allres.push({ frame: nowFrame });
                    const sim = await sendImage(frame);
                    console.log("frame : ", nowFrame, "sim : ", sim);
                    setCurFrame(nowFrame);
                }
            }
        }, frameInterval);
        if (learnComplete == true) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [sendStart, learnComplete]);

    const captureBlob = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const slice = imageSrc.split(",")[1];
        console.log(slice);
        setImg(slice);
        return imageSrc;
    }, [webcamRef]);

    const sendBase64 = () => {
        const imageSrc = captureBlob();
        const formData = new FormData();
        formData.append("image", imageSrc);
        formData.append("nframe", frame);
        getSimRequest2(formData);
    };

    const captureImg = React.useCallback(
        async (f) => {
            const imageSrc = webcamRef.current.getScreenshot();
            // base64 문자열을 파일로 변환
            const res = await base64ToFile(imageSrc, f);
            console.log(`${f} 프레임 : ${imageSrc}`);
            return res;
        },
        [webcamRef]
    );

    // base64 문자열을 파일로 변환하는 함수
    function base64ToFile(base64, f) {
        const byteCharacters = atob(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""));
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: "image/png" }); // 이미지 형식에 맞게 타입 변경
        const file = new File([blob], `image${f}.png`, { type: "image/png" }); // 파일 이름과 타입 설정

        const res = { base64: base64, file: file };
        return res;
    }

    const sendImage = async (f) => {
        const formData = new FormData();
        formData.append("nframe", f);
        const imageFile = await captureImg(f);
        formData.append("image", imageFile.file);
        const res = await getSimRequest(formData);

        allres.forEach((it, index) => {
            if (it.frame === f) {
                allres[index] = { ...it, file: imageFile, sim: res.simirarity };
            }
        });
        if (res.simirarity >= PASS) {
            console.log(true);
            similarities.push(true);
            console.log("sim p/f : ", similarities);
        } else if (res.simirarity < PASS) {
            console.log(false);
            // setSimilarities([...similarities, false]);
            similarities.push(false);
            console.log("sim p/f : ", similarities);
        }
        if (similarities.length === Math.floor(duration * 2)) {
            // 현재 초당 2번씩 전송중이라 전체 길이 * 2개의 데이터가 생기면 종료
            console.log("finish");
            setResLoading(false);
            console.log("All Results : ", allres);
            const calcPassPercent = (sim) => {
                let trueCount = 0;
                // 배열을 순회하면서 true인 경우 trueCount를 증가시킴
                for (let i = 0; i < sim.length; i++) {
                    if (sim[i] === true) {
                        trueCount++;
                    }
                }
                // true의 비율 계산
                const truePercentage = (trueCount / sim.length) * 100;
                return truePercentage;
            };
            setLearnPercent(calcPassPercent(similarities));
        }
        return res;
    };

    return (
        <div className="WebcamCapture">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" videoConstraints={videoConstraints} mirrored={false} />
            {/* <Button text={"Capture"} onClick={sendBase64}>
                Blob으로 보내보기
            </Button>
            <Button text={"Capture"} onClick={sendImage}>
                이미지로 보내보기
            </Button> */}
            {/* <img width={"200px"} src={`data:image/png;base64,${img}`} /> */}
            {/* {similarities.toString()} */}
        </div>
    );
};
