import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date, file, title }) => {
    const navigate = useNavigate();

    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`./diary/${id}`);
    };
    const goEdit = () => {
        navigate(`./edit/${id}`);
    };
    return (
        <div className="DiaryItem">
            <div
                className={[
                    "emotion_img_wrapper",
                    `emotion_img_wrapper_${emotion}`,
                ].join(" ")}
                onClick={goDetail}
            >
                {file.data && <img src={file.data} width={"100%"} />}
            </div>
            <div className="info_wrapper" onClick={goDetail}>
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">
                    {title.slice(0, 25)}
                </div>
            </div>
            <div className="btn_wrapper" onClick={goEdit}>
                <MyButton text={"수정하기"} />
            </div>
        </div>
    );
};

export default React.memo(DiaryItem);
