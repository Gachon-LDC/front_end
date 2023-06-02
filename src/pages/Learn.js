import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import styled from "styled-components";
import { WebcamCapture } from "../components/WebcamCapture";
import "./css/Learn.css";

import { AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineVideoCamera } from "react-icons/ai";
import ReactPlayer from "react-player";
import Vid from "../../src/pages/videoplayback.mp4";
import LearnIcon from "../assets/learn.png";
import CommentList from "../components/CommentList";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

const Learn = () => {
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `number${id}`;
    }, []);

    const { id } = useParams();
    //id 를 꺼내쓰자
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [source, setSource] = useState();
    const [openCamera, setOpenCamera] = useState(true);
    const [timer, setTimer] = useState(0);

    const [vidState, setVidState] = useState({
        playing: false, // 재생중인지
        muted: false, // 음소거인지
        controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
        volume: 0.5, // 볼륨크기
        playbackRate: 1.0, // 배속
        played: 0, // 재생의 정도 (value)
        seeking: false, // 재생바를 움직이고 있는지
        duration: 0, // 전체 시간
    });
    const onStartVid = () => {
        setVidState({ ...vidState, playing: !vidState.playing });
    };

    const onLearnStart = () => {
        setOpenCamera(false);
        setVidState({ ...vidState, playing: false });
        setTimeout(() => {}, 5000);
    };
    useEffect(() => {
        const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
        if (targetDiary) {
            setData(targetDiary);
        } else {
            navigate("/", { replace: true });
        }
    }, [id, diaryList]);
    useEffect(() => {
        if (data) {
            console.log(data);
            setSource(data.file.data);
        }
    }, [data]);
    if (!data) {
        return <div className="Post">로딩중입니다...</div>;
    } else {
        return (
            <div className="Post Learn">
                <MyHeader
                    headText={data.title}
                    leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
                    rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <div className="body">
                    <div className="videoWrapper">
                        <ReactPlayer playbackRate={vidState.playbackRate} url={Vid} width="720px" height="720px" muted={vidState.muted} playing={vidState.playing} loop={true} />
                    </div>
                    <div className="controller">
                        <div onClick={onStartVid}>
                            {vidState.playing ? (
                                <div className="playBtnWrapper">
                                    <AiOutlinePauseCircle size={60} /> <div>멈춤</div>
                                </div>
                            ) : (
                                <div className="playBtnWrapper">
                                    <AiOutlinePlayCircle size={60} /> <div>재생</div>
                                </div>
                            )}
                        </div>
                        <div className="learnBtnWrapper" onClick={() => onLearnStart()}>
                            <img className="learnIcon" src={LearnIcon} />
                            <div>배우기</div>
                        </div>
                        <div className="learnBtnWrapper">
                            <AiOutlineVideoCamera size={60} />
                            <div>촬영하기</div>
                        </div>
                    </div>

                    <div className="myVidWrapper">{openCamera ? <WebcamCapture /> : <h1>{timer}</h1>}</div>

                    {/* <CommentList /> */}
                </div>
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
                {/* <ButtonGroup>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, muted: !vidState.muted })}>
                        mute
                    </Button>
                    <Button variant="outline-primary" onClick={() => setVidState({ ...vidState, controls: !vidState.controls })}>
                        controls
                    </Button>
                </ButtonGroup> */}
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
