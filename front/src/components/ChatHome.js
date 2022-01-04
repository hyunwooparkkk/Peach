import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChatHome.css';

const ChatHome = ({ roomName, onChangeRoom }) => {
    return (
        <div className="homeContainer">
            <input 
                type="text" 
                placeholder="roomName"
                value={roomName}
                onChange={onChangeRoom}
                className="roomName"
            />
            <Link to={`chat/${roomName}`} className="enrtyRoom">JOIN</Link>
        </div>
    );
}

export default ChatHome;
