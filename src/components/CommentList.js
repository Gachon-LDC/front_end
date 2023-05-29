import Comment from "../pages/Comment";

const mock = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

const CommentList = () => {
    return (
        <div className="CommentList">
            {mock.map((it) => (
                <Comment />
            ))}
            <div>
                <input type="text" />
            </div>
        </div>
    );
};

export default CommentList;
