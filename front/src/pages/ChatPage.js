import React from 'react';
import ChatContainer from '../containers/ChatContainer';

const ChatPage = (props) => {
    return (
        <ChatContainer
            roomName={props.match.params}
        />
    )
}

export default ChatPage;
