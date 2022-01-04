import React, { useState } from 'react';
import ChatHome from '../components/ChatHome';

const ChatHomeContainer = () => {
    const [roomName, setRoomName] = useState('');

    const onChangeRoom = (e) => {
        setRoomName(e.target.value);
    }

    return (
        <ChatHome
            roomName={roomName}
            onChangeRoom={onChangeRoom}
        />
    );
}

export default ChatHomeContainer;
