import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import Chat from '../components/Chat';

const ChatContainer = ({ roomName }) => {

    const {room} = roomName;
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [image, setImage] = useState(null);
    const [notice, setNotice] = useState('');
    const [modalState, setModalState] = useState(false);
    
    const socketRef = useRef();

    useEffect(async () => {
        // 네임스페이스
        socketRef.current = io("http://localhost:5000", {
            query: {room},
        });

        await socketRef.current.on('chatLists', (chatLists) => {
            setChats(chatLists);
        });
        
        socketRef.current.on('newMessage', (message) => {
            const incomingMessage = {
                ...message,
                sender: message.senderId === socketRef.current.id,
                date: message.date, 
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on('typing', (socketID) => {
            setNotice(`${socketID} 입력중...`);
        });
        socketRef.current.on('typingDone', () => {
            setNotice('');
        });

        return() => {
            socketRef.current.disconnect();
        } 
    }, [room]);

    const onChangeNewMessage = (e) => {
        setNewMessage(e.target.value);
        socketRef.current.emit('typing');
    }
    
    const onSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    }
    
    const sendMessage = (newTextMessage) => {
        socketRef.current.emit('newText', {
            senderId: socketRef.current.id,
            textMessage: newTextMessage,
            date: Date(),
        });
        socketRef.current.emit('typingDone');
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onSendMessage();
        }
    }

    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const onSendImage = async (ctx) => {
        const formData = new FormData();

        formData.append('file', image);

        await axios.post('/api/uploads', formData)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(socketRef.current.id);

            socketRef.current.emit('newImage', {
                senderId: socketRef.current.id,
                imageMessage: res.data,
                date: Date(),
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
        closeModal();
    }
    
    return (
        <>
            <Chat
                room={room}
                chats={chats}
                messages={messages}
                newMessage={newMessage}
                notice={notice}
                onChangeNewMessage={onChangeNewMessage}
                onSendMessage={onSendMessage}
                onKeyPress={onKeyPress}
                
                // 이미지 업로드
                image={image}
                onChangeImage={onChangeImage}
                onSendImage={onSendImage}

                // 모달창
                modalState={modalState} 
                openModal={openModal}
                closeModal={closeModal}
            />
        </>
    );
}

export default  withRouter(ChatContainer);
