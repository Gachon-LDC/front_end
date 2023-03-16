import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { DiaryStateContext } from "../App";

import PostList from "../components/PostList";
import "./css/Home.css";

const Home = () => {
    //탭 이름을 바꾸는 코드.
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `LDC`;
    }, []);

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);

    useEffect(() => {
        if (diaryList.length >= 1) {
            setData(diaryList);
        }
    }, [diaryList]);

    return (
        <div className="Home">
            <PostList diaryList={data} />
        </div>
    );
};

const Wrap = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-bottom: 20px;
`;
export default Home;
