import { useState } from "react";
import Comment from "./Comment";
import "./css/CommentList.css";

const mock = [{ content: "hi" }, { content: "hello" }, { content: "hello" }, { content: "hello" }, { content: "hello" }];

const CommentList = () => {
    const [content, setContent] = useState("");
    const addComment = () => {
        if (content == "") return;
        mock.push({ content: content });
        setContent("");
    };
    return (
        <div className="CommentList">
            <h3>댓글</h3>
            {mock.map((it) => (
                <Comment content={it.content} />
            ))}
            <form className="commentInput" onSubmit={addComment}>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </form>
        </div>
    );
};

export default CommentList;
