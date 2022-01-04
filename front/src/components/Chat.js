import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import Modal from './Modal';
import '../styles/Chat.css';
import upload from '../images/upload.png';
import sendButton from '../images/send.png';

const Chat = (props) => {
    const { 
        room, chats, messages, newMessage, notice, 
        onChangeNewMessage, onSendMessage, onKeyPress, 
        modalState, openModal, closeModal, 
        image, onChangeImage, onSendImage,
    } = props;
    
    const scrollRef = useRef();
    
    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [chats, messages]);

    return (
        <div className="chatContainer">
            <h1 className="chatRoomName">{room}</h1>
            <div className="messageContainer"  >
                <ol className="messageList"  ref={scrollRef}>
                        {chats.map((chat, i) => 
                        {
                            if(chat.messageImg) {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </div>
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentDate" : "receivedDate"
                                            // }`}
                                        >
                                            {moment(chat.messageDate).format('LT')}
                                        </div>
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentMessage" : "receivedMessage"
                                            // }`}
                                        >
                                            <img src={`/uploads/${chat.messageImg}`} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentId" : "receivedId"
                                            // }`}
                                        >
                                            {chat.user}
                                        </div>
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentDate" : "receivedDate"
                                            // }`}
                                        >
                                            {moment(chat.messageDate).format('LT')}
                                        </div>
                                        <div
                                            // className={`messageItem ${
                                            //     message.sender ? "sentMessage" : "receivedMessage"
                                            // }`}
                                        >
                                            {chat.message}
                                        </div>
                                    </div>
                                );
                            }                        
                        }
                        )}
                        
                        {messages.map((message, i) => 
                        {
                            if(message.imageMessage) {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </div>
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentDate" : "receivedDate"
                                            }`}
                                        >
                                            {moment(message.date).format('LT')}
                                        </div>
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            <img src={`/uploads/${message.imageMessage}`} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div
                                        ref={scrollRef}
                                        key={i}
                                    >
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentId" : "receivedId"
                                            }`}
                                        >
                                            {message.senderId}
                                        </div>
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentDate" : "receivedDate"
                                            }`}
                                        >
                                            {moment(message.date).format('LT')}
                                        </div>
                                        <div
                                            className={`messageItem ${
                                                message.sender ? "sentMessage" : "receivedMessage"
                                            }`}
                                        >
                                            {message.textMessage}
                                        </div>
                                    </div>
                                )
                                
                            }
                        }
                        )}
                </ol>
            </div>
            
            <Modal 
                // 이미지 업로드
                image={image}
                onChangeImage={onChangeImage}
                onSendImage={onSendImage}

                // 모달창
                modalState={modalState} 
                closeModal={closeModal} 
            />
            
            <div className="noticeInputChat">{notice}</div>
            <div className="textArea">
                <button className="imageItem" onClick={openModal}>
                    <img src={upload} className="upload"/>
                </button>
                <textarea
                    placeholder="Text Message"
                    value={newMessage}
                    onChange={onChangeNewMessage}
                    onKeyPress={onKeyPress}
                    className="textMessage"
                    disabled={modalState? true:false}
                />
                <button className="sendMessage" onClick={onSendMessage} disabled={modalState? true:false}>
                    <img src={sendButton} className="sendButton"/>
                </button>
            </div>
        </div>
    )
}

export default Chat;
