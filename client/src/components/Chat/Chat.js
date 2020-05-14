import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

let socket;

const Chat = ({location}) => {
    const[name, setName]= useState('');
    //const[room, setRoom]= useState('')
    const ENDPOINT = 'localhost:3000';

    useEffect(() => {
        const {name} = queryString.parse(location.search);

        console.log(name);
        
        //socket = io(ENDPOINT);

        //setRoom(room);
        setName(name);

        //socket.emit('join', {name});

        //console.log(socket);
    }, [ENDPOINT, location.search])
    return (
        <h1>Chat</h1>
    )
}

export default Chat;