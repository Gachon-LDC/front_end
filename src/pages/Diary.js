import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
    const { id } = useParams();
    //id 를 꺼내쓰자
    return (
        <div>
            <h1>Diary</h1>
            <p>d이곳은 일기상세 페이지입니다.</p>
        </div>
    );
};

export default Diary;
