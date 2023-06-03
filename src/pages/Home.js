import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { DiaryStateContext } from "../App";

import PostList from "../components/PostList";
import "./css/Home.css";
import { Profile } from "../components/Profile";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import { CategoryBar } from "../components/CategoryBar";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { VideoContext } from "../services/video/video.context";

const Home = () => {
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthenticationContext);
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `LDC`;
    }, []);

    const diaryList = useContext(DiaryStateContext);
    const { getVideos } = useContext(VideoContext);

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     if (diaryList.length >= 1) {
    //         setData(diaryList);
    //     }
    // }, [diaryList]);

    const onLoadhome = () => {
        getVideos(setData);
    };

    useEffect(() => {
        onLoadhome();
    }, []);

    useEffect(() => {
        isLogin || navigate("/");
    }, [isLogin]);

    return (
        <div className="Home">
            <div className="menu_wrapper">
                <div className="left_col">{<CategoryBar />}</div>
                <div className="right_col">
                    <MyButton type={"POSITIVE"} text={"New Post"} onClick={() => navigate("/new")} />
                </div>
            </div>
            <div className="bottom_container">
                <PostList postList={data} />
                <Profile />
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
