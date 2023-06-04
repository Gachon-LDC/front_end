import { useContext, useEffect } from "react";
import "./css/Profile.css";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import MyButton from "./MyButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { onLogout, isLogin, userData, withdrawalHandler } = useContext(AuthenticationContext);

    const navigate = useNavigate();

    const onWithdrawl = () => {
        if (window.confirm("회원탈퇴 하시겠습니까?") == true) withdrawalHandler(localStorage.getItem("email"), localStorage.getItem("pwd"));
    };

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className="Profile">
            <p>사진</p>
            <p>{userData.email}</p>
            <p>마이페이지</p>
            <p>설정</p>
            <Button className={"logoutBtn"} variant="outline-warning" onClick={onLogout}>
                로그아웃
            </Button>
            <Button className={"withdrawlBtn"} variant="outline-danger" onClick={onWithdrawl}>
                회원탈퇴
            </Button>
        </div>
    );
};
