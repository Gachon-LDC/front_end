import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import styled from "styled-components";
import { WebcamCapture } from "../components/WebcamCapture";
import "./css/Post.css";
import ReactPlayer from "react-player";
import Vid from "../../src/pages/videoplayback.mp4";

import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

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
    const [openCamera, setOpenCamera] = useState(false);
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
        // localStorage.setItem("video", require("./videoplayback.mp4"));
        return (
            <div className="Post">
                <MyHeader
                    headText={data.title}
                    leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
                    rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <article className="videoWrapper">
                    <ReactPlayer className="video" url={Vid} width="400px" height="720px" muted={vidState.muted} playing={vidState.playing} loop={true} />
                    <MyButton
                        text={"toggle camera"}
                        onClick={() => {
                            setOpenCamera(!openCamera);
                        }}
                    />
                    {data.file.image && <img className="content" src={source} width="600" alt="Blob URL Image" />}
                    {data.file.video && <video className="content" src={source} controls width="350px" />}

                    <div className="VideoWrapper">
                        {openCamera && <WebcamCapture />}
                        {/* 위 컴포넌트가 사진찍고 저장하는 컴포넌트임 */}
                    </div>
                </article>
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
