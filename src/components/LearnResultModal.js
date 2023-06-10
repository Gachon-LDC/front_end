import { Modal, ProgressBar, Spinner } from "react-bootstrap";
import "./css/LearnResultModal.css";
import { Firework } from "./Firework";

export const LearnResultModal = ({ show, handleClose, resLoading, learnPercent }) => {
    return (
        <Modal className="LearnResultModal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{resLoading ? "결과 로딩중 " : "학습 완료!! 결과 : "}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resLoading ? (
                    <Spinner></Spinner>
                ) : (
                    <div className="modalBody">
                        <Firework />
                        {learnPercent >= 85.231 ? <div className="PERFECT">PERFECT!!</div> : learnPercent >= 78.962 ? <div className="NORMAL">NORMAL</div> : <div className="POOR">POOR...</div>}
                        <div className="bodyText"> 결과 : {learnPercent.toFixed(2)}%의 정확도!</div>
                        <ProgressBar className="progressbar" now={learnPercent} label={`정확도`} animated />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};
