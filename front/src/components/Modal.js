import React from 'react';
import '../styles/Modal.css';

const Modal = ({ modalState, closeModal, image, onChangeImage, onSendImage }) => {
    return (
        <div className={ modalState? 'openModal' : 'nomodal'}>
            { modalState? 
            (<div className="modalContainer">
                <div className="modalTop">
                    <button className="close" onClick={closeModal}>
                        X
                    </button>
                </div>
                <div className="modalMiddle">
                    <input
                        type="file"
                        onChange={onChangeImage}
                        accept=".png, .jpg, .jpeg, .gif"
                        className="imageMessage"
                    />
                </div>
                <div className="modalBttom">
                    <button className="sendImage" onClick={onSendImage}>
                        SEND
                    </button>
                </div>
            </div>)
            : null }
        </div>
    );
}

export default Modal;
