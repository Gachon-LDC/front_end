import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./css/PostItem.css";
import ReactPlayer from "react-player";
const PostItem = ({ id, content, title }) => {
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/post/${id}`);
    };
    const goEdit = () => {
        navigate(`./edit/${id}`);
    };
    return (
        <div className="PostItem" onClick={goDetail}>
            <Card className="Card">
                <Card.Header>
                    <div className="VideoWrapper">
                        <ReactPlayer className="player" url={`https://ldc.insiro.me/media/video/${id}.mp4`} width={"100%"} height={"120%"} muted={true} playing={false} loop={true} />
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{title.slice(0, 25)}</Card.Title>
                    <Card.Text> 10 Views / 8 Likes</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </div>
    );
};

export default React.memo(PostItem);
