import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = ({location}) => {
    const[name, setName]= useState('');
    const[room, setRoom]= useState('');
    const[messages, setMessages]= useState([]);
    const[message, setMessage]= useState('');


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

    useEffect(() =>{
        socket.on('message', (message) => {
            setMessages([...messages, message]);

        })
        }, [messages]);

        const sendMessage = (event)=>{

            event.preventDefault();


            if(message){
                socket.emit('sendMessage', message, ()=> setMessage(''));
            }
        }

        console.log(message, messages);

        //function for sending messages

    return (
        <div className="generalOuter">
            <h1 className="heading">Chat</h1>
            <div className="general">
            <input value={message} onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event=> event.key === 'Enter'? sendMessage(event): null)}/>

            </div>

        </div>
    )
}

export default Chat;
