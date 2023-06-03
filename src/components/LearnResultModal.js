import { Modal } from "react-bootstrap";

export const LearnResultModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>학습 완료</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>결과 : 68%의 정확도!</div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};
