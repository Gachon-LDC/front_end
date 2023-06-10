import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Login.css";

import video3 from "../assets/dancerMain.mov";
import LDC from "../assets/LDC2.png";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const Login = () => {
    const { registerHandler, onLogin, isLogin } = useContext(AuthenticationContext);

    //login states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    // modal states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Signup States
    const [suUsername, setSuUsername] = useState("");
    const [suPassword, setSuPassword] = useState("");
    const [suPassword2, setSuPassword2] = useState("");
    const [suFullname, setSuFullname] = useState("");
    const [suEmail, setSuEmail] = useState("");

    const navigate = useNavigate();

    const handleLogin = (event) => {
        onLogin(username, password);
    };
    useEffect(() => {
        isLogin && navigate("/home");
    }, [isLogin]);

    const handleLogout = () => {
        // Perform logout logic here
        setLoggedIn(false);
    };

    if (loggedIn) {
        return (
            <div>
                <p>You are logged in as {username}.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    const signupHandler = () => {
        if (suPassword !== suPassword2) {
            alert("비밀먼호가 다릅니다.");
            return;
        }
        registerHandler(suEmail, suPassword, setShow);
    };

    return (
        <div className="Login">
            <video className="main_vid" autoPlay={true} muted={true} loop={true} playsInline={true} src={video3} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <Form.Control
                            className="signup-email"
                            placeholder="Email"
                            aria-label="Email"
                            value={suEmail}
                            aria-describedby="basic-addon1"
                            onChange={(event) => setSuEmail(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            className="signup-password"
                            placeholder="Password"
                            aria-label="Password"
                            value={suPassword}
                            aria-describedby="basic-addon1"
                            onChange={(event) => setSuPassword(event.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            className="signup-password"
                            placeholder="Retype Password"
                            aria-label="Password"
                            value={suPassword2}
                            aria-describedby="basic-addon1"
                            onChange={(event) => setSuPassword2(event.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={signupHandler}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="logo">
                <img src={LDC} width="200px" />
            </div>
            <form className="login_form" onSubmit={handleLogin}>
                <InputGroup>
                    <Form.Control
                        className="username"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        aria-describedby="basic-addon1"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Form.Control
                        type="password"
                        className="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        aria-describedby="basic-addon1"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </InputGroup>

                <Button className="submit-btn" variant="outline-primary" size="md" onClick={handleLogin}>
                    Log in
                </Button>
                <Button className="signin-btn" size="md" variant="outline-primary" onClick={handleShow}>
                    Sign Up
                </Button>
            </form>
            {/* <div className="google">login with google</div> */}
        </div>
    );
};

export default Login;
