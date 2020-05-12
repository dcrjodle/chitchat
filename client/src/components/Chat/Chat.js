import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

const Chat = ({location}) => {
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        console.log(name, room);
    })
    return (
        <h1>Chat</h1>
    )
}

export default Chat;