import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';



let socket;


const Chat = ({location}) => {
    const[name, setName]= useState('');
    const[room, setRoom]= useState('');
    const[messages, setMessages]= useState([]);
    const[message, setMessage]= useState('');


    const ENDPOINT = 'https://young-beach-90877.herokuapp.com/';

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
            <h1 className="heading">Chat {room} !</h1>
            <div className="general">
                <InfoBar name={name}/>
            <Input message ={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
<<<<<<< HEAD

           <Link onClick = {(event) => setRoom("AFK")} to={`/chat?name=${name}&room=${room}`} >
           <div className="space"></div>
           <button className="button mt-20" type="submit"> AFK </button>
           </Link>
           <Link onClick = {(event) => setRoom("Dirtytalk")} to={`/chat?name=${name}&room=${room}`} >
           <div className="space"></div>
           <button className="button mt-20" type="submit">Dirtytalk</button>
           </Link>
           <Link onClick = {(event) => setRoom("Memeroom")} to={`/chat?name=${name}&room=${room}`} >
           <div className="space"></div>
           <button className="button mt-20" type="submit">Memeroom</button>
           </Link>
           <Link onClick = {(event) => setRoom("Random")} to={`/chat?name=${name}&room=${room}`} >
           <div className="space"></div>
           <button className="button mt-20" type="submit">Random</button>
           </Link>
=======
>>>>>>> 6275e82b6b51bcbd5c2ea445d0b1988ff2df578e
        </div>
    )
}

export default Chat;
