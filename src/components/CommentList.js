import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import "./css/CommentList.css";
import { VideoContext } from "../services/video/video.context";
import { Button } from "react-bootstrap";

const CommentList = ({ id }) => {
    const { postComment, getComments } = useContext(VideoContext);
    const [content, setContent] = useState("");
    const [comments, setComments] = useState(null);
    const addComment = () => {
        postComment(id, content);
        getComments(id, setComments);
        setContent("");
    };
    const onLoad = () => {
        getComments(id, setComments);
    };
    useEffect(() => {
        onLoad();
    }, []);
    useEffect(() => {
        console.log(comments);
    }, [comments]);
    return (
        <div className="CommentList">
            <h3>댓글</h3>
            {comments === null ? null : comments.map((it) => <Comment content={it.content} key={it.uid} />)}

            <div className="commentInputBar">
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                <Button className="submitBtn" onClick={() => addComment()}>
                    댓글 달기
                </Button>
            </div>
        </div>
    );
};

export default CommentList;
