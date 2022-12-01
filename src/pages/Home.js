import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import VideoUploader from "../components/VideoUploader";
import { WebcamCapture } from "../components/WebcamCapture";
import { WebcamDemo } from "../components/WebcamDemo";
const Home = () => {
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `LDC`;
    }, []);

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
            console.log("cur: ", curDate);
            console.log("fir: ", firstDay);
            console.log("las: ", lastDay);
            console.log(
                diaryList.filter(
                    (it) => firstDay <= it.date && it.date <= lastDay
                )
            );
            setData(
                diaryList.filter(
                    (it) => firstDay <= it.date && it.date <= lastDay
                )
            );
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        // console.log(data);
    }, [data]);
    //15.53

    const increaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        );
    };
    const decreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        );
    };
    return (
        <div className="Home">
            <MyHeader
                headText={headText}
                leftChild={
                    <MyButton
                        text={"<"}
                        onClick={() => {
                            decreaseMonth();
                        }}
                    />
                }
                rightChild={
                    <MyButton
                        text={">"}
                        onClick={() => {
                            increaseMonth();
                        }}
                    />
                }
            />
            <DiaryList diaryList={data} />
            <div className="VideoWrapper">
                <VideoUploader />
                <Wrap>
                    <WebcamCapture />
                    <MyButton text={"submit"} type={"POSITIVE"} />
                </Wrap>
                {/* 위 컴포넌트가 사진찍고 저장하는 컴포넌트임 */}
            </div>
        </div>
    );
};

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
export default Home;
