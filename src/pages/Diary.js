import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import styled from "styled-components";
import { WebcamCapture } from "../components/WebcamCapture";

const Diary = () => {
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
    useEffect(() => {
        const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
        );
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
        return <div className="Diary">로딩중입니다...</div>;
    } else {
        // localStorage.setItem("video", require("./videoplayback.mp4"));
        return (
            <div className="Diary">
                <MyHeader
                    headText={data.title}
                    leftChild={
                        <MyButton
                            text={"뒤로가기"}
                            onClick={() => navigate(-1)}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"수정하기"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <Wrap className="contentWrapper">
                        {data.file.image && (
                            <img
                                className="content"
                                src={source}
                                width="600"
                                alt="Blob URL Image"
                            />
                        )}
                        {data.file.video && (
                            <video
                                className="content"
                                src={source}
                                controls
                                width="350px"
                            />
                        )}
                        <div id="Webcam" width="350px" height="350px" />
                    </Wrap>

                    {/* <section>
                        <video controls="controls">
                            <source
                                src={localStorage.getItem("video")}
                                type="video/mp4"
                            />
                        </video>
                    </section> */}
                    <div className="VideoWrapper">
                        <MyButton
                            text={"toggle camera"}
                            onClick={() => {
                                setOpenCamera(!openCamera);
                            }}
                        />
                        {openCamera && (
                            <Wrap>
                                <WebcamCapture />
                            </Wrap>
                        )}
                        {/* 위 컴포넌트가 사진찍고 저장하는 컴포넌트임 */}
                    </div>
                    <section>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
