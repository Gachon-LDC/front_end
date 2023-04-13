import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

import PostItem from "./PostItem";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        >
            {optionList.map((it, idx) => (
                <option value={it.value} key={idx}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const PostList = ({ postList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    return (
        <div className="PostList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={"POSITIVE"}
                        text={"New Post"}
                        onClick={() => navigate("/new")}
                    />
                </div>
            </div>
            {postList.map((it) => (
                <PostItem key={it.id} {...it} />
            ))}
        </div>
    );
};

PostList.defaultProps = {
    postList: [],
};
export default PostList;
