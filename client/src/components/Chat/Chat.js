import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = ({location}) => {
    const[name, setName]= useState('');
    const[room, setRoom]= useState('')
    const ENDPOINT = 'localhost:3000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        console.log(name, room);
        
        socket = io(ENDPOINT);
        setName(name);

        socket.emit('join', {name, room}, ()=>{

        });

        return () => {
            socket.emit('disconnect')
            socket.off();
        }

        //console.log(socket);
    }, [ENDPOINT, location.search])
    return (
        <div className="generalOuter">
            <h1 className="heading">Chat</h1>
            <div className="general">hejsAN</div>
        </div>
    )
}

export default Chat;