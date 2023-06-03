import { useState } from "react";
import Comment from "./Comment";
import "./css/CommentList.css";

const CommentList = ({ comments }) => {
    const [content, setContent] = useState("");
    const addComment = () => {};
    return (
        <div className="CommentList">
            <h3>댓글</h3>
            {comments.map((it) => (
                <Comment content={it.content} />
            ))}
            <form className="commentInput" onSubmit={addComment}>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </form>
        </div>
    );
};

export default CommentList;
