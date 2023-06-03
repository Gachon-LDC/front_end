import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import "./css/PostList.css";
import PostItem from "./PostItem";

const PostList = ({ postList }) => {
    const navigate = useNavigate();

    return (
        <div className="PostList">
            {postList.map((it) => (
                <PostItem key={it.video_id} title={it.title} dance={it.dance} content={it.ontent} />
            ))}
        </div>
    );
};

PostList.defaultProps = {
    postList: [],
};
export default PostList;
