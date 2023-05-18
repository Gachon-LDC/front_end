import { useContext, useEffect } from "react";
import "./css/Profile.css";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import MyButton from "./MyButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { onLogout, isLogin, userEmail } = useContext(AuthenticationContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin == false) {
            navigate("/");
        }
    }, [isLogin]);
    return (
        <div className="Profile">
            <p>사진</p>
            <p>{userEmail}</p>
            <p>마이페이지</p>
            <p>설정</p>
            <Button variant="outline-warning" onClick={onLogout}>
                로그아웃
            </Button>
        </div>
    );
};
