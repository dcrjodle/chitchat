import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'

import "./Messages.css";

const Message = ({ message, name}) => {
    let isSentBycurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentBycurrentUser = true;
    }

    return (
        isSentBycurrentUser
           ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText">(trimmedName)</p>
                <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">(text)</p>
                </div>
            </div>
            )
            : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                <p className="messageText colorDark">(text)</p>
                </div>
            <p className="sentText pl-10">{user}</p>
            </div>

            )
    )
}

export default Messages;
