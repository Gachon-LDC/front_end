import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./css/PostItem.css";
const PostItem = ({ id, emotion, content, date, file, title }) => {
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
                <Card.Img variant="top" src={require("../assets/ditto.png")} />
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