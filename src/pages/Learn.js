import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import styled from "styled-components";
import { WebcamCapture } from "../components/WebcamCapture";
import "./css/Learn.css";

import { AiOutlineVideoCamera } from "react-icons/ai";
import ReactPlayer from "react-player";
import Vid from "../../src/pages/videoplayback.mp4";
import LearnIcon from "../assets/learn.png";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { VideoContext } from "../services/video/video.context";
import { LearnResultModal } from "../components/LearnResultModal";

const Learn = () => {
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `number${id}`;
    }, []);

    const { id } = useParams();
    //id 를 꺼내쓰자

    const navigate = useNavigate();
    const [data, setData] = useState();
    const [openCamera, setOpenCamera] = useState(true);
    const [timer, setTimer] = useState(0);
    const [learning, setLearning] = useState(false);
    const [sendStart, setSendStart] = useState(false);
    const [learnComplete, setLearnComplete] = useState(true);
    const [resultModalShow, setResultModalShow] = useState(false);
    const [resLoading, setResLoading] = useState(true);
    const [learnPercent, setLearnPercent] = useState(0);

    const webcamRef = React.useRef(null);
    const { getVideoById, getPhotoSimilarity } = useContext(VideoContext);

    const handleClose = () => {
        setResultModalShow(false);
    };
    const player = useRef();

    const [vidState, setVidState] = useState({
        playing: false, // 재생중인지
        muted: false, // 음소거인지
        controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
        volume: 0.5, // 볼륨크기
        playbackRate: 1.0, // 배속
        played: 0, // 재생의 정도 (value)
        seeking: false, // 재생바를 움직이고 있는지
        duration: 0, // 전체 시간
        loop: true,
    });

    const onPageLoad = () => {
        getVideoById(id, setData);
    };
    useEffect(() => {
        onPageLoad();
    }, []);

    const [frameInterval, setFrameInterval] = useState(1);
    const [fps, setFps] = useState(1);
    const [duration, setDuration] = useState(0);
    const onLearnStart = async () => {
        setDuration(player.current.getDuration());
        const fpsRes = await sendImage();
        setOpenCamera(false);
        setVidState({ ...vidState, playing: false });
        player.current.seekTo(0);
        setTimer(3);
        setFps(fpsRes.fps);
        setLearning(true);
        setLearnComplete(false);
    };

    useEffect(() => {
        console.log("fps : ", fps);
        setFrameInterval(1000 / fps);
        console.log("frame Interval : ", 1000 / fps);
    }, [fps]);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
        if (timer === 0 && learning === true) {
            clearInterval(interval);
            setOpenCamera(true);
            setVidState({ ...vidState, playing: true, loop: false });
            setSendStart(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        // console.log(vidState.played);
        if (vidState.played === 1) {
            setLearning(false);
            setSendStart(false);
            setLearnComplete(true);
            setResultModalShow(true);
        }
    }, [vidState.played]);

    /* 이미지 전송을 위한 코드 */

    const captureImg = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // base64 문자열을 파일로 변환
        const file = await base64ToFile(imageSrc);
        return file;
    }, [webcamRef]);

    // base64 문자열을 파일로 변환하는 함수
    function base64ToFile(base64) {
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
        const file = new File([blob], `image.png`, { type: "image/png" }); // 파일 이름과 타입 설정

        return file;
    }

    const sendImage = async () => {
        const imageFile = await captureImg();
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("nframe", 0);
        const res = await getPhotoSimilarity(formData, id);
        return res;
    };

    if (!data) {
        return <div className="Post">로딩중입니다...</div>;
    } else {
        return (
            <div className="Post Learn">
                <LearnResultModal show={resultModalShow} handleClose={handleClose} resLoading={resLoading} learnPercent={learnPercent} />
                <MyHeader
                    headText={data.title}
                    leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
                    rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <div className="body">
                    <div className="videoWrapper">
                        <ReactPlayer
                            playbackRate={vidState.playbackRate}
                            url={Vid}
                            width="100%"
                            height="100%"
                            muted={vidState.muted}
                            playing={vidState.playing}
                            played={vidState.played}
                            loop={vidState.loop}
                            duration={vidState.duration}
                            ref={player}
                            onProgress={(e) => setVidState({ ...vidState, played: e.played })}
                        />
                    </div>
                    <div className="controller">
                        <div className="learnBtnWrapper" onClick={() => onLearnStart()}>
                            <img className="learnIcon" src={LearnIcon} />
                            <div>배우기 시작</div>
                        </div>
                        <div className="learnBtnWrapper">
                            <AiOutlineVideoCamera size={60} />
                            <div>촬영하기</div>
                        </div>
                    </div>

                    <div className="myVidWrapper">
                        {openCamera || (
                            <div className="timer">
                                <h1>{timer}</h1>
                            </div>
                        )}
                        <WebcamCapture
                            sendStart={sendStart}
                            learnComplete={learnComplete}
                            id={id}
                            frameInterval={frameInterval}
                            webcamRef={webcamRef}
                            fps={fps}
                            setResLoading={setResLoading}
                            duration={duration}
                            setLearnPercent={setLearnPercent}
                        />
                    </div>
                </div>
                <div>재생속도 : {vidState.playbackRate}</div>
                <ButtonGroup>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, playbackRate: 0.5 })}>
                        0.5x
                    </Button>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, playbackRate: 0.75 })}>
                        0.75x
                    </Button>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, playbackRate: 0.9 })}>
                        0.9x
                    </Button>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, playbackRate: 1 })}>
                        1x
                    </Button>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, playbackRate: 2 })}>
                        2x
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
};

export default Learn;

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
