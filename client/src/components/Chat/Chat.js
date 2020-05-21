import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


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
            console.log(message);

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
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} name={name}/>
                    <Messages messages ={messages} name={name}/>
                    <Input message ={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div> 
            </div>
            <h3 className="rooms">Rooms</h3>
            <div className="buttons">
           <Link onClick = {clickafk} >
           <div className="space"></div>
           <button className="roomButton" type="submit"> AFK </button>
           </Link>
           <Link onClick = {clickdt} >
           <div className="space"></div>
           <button className="roomButton" type="submit">Dirtytalk</button>
           </Link>
           <Link onClick = {clickmr} >
           <div className="space"></div>
           <button className="roomButton" type="submit">Memeroom</button>
           </Link>
           <Link onClick = {clickr} >
           <div className="space"></div>
           <button className="roomButton" type="submit">Random</button>
           </Link>
           </div>
        </div>
    )

    function clickr(){

        setRoom('Random');
        window.location = `/chat?name=${name}&room=Random`;


    }
    
    function clickmr(){

        setRoom('Memeroom');
        window.location = `/chat?name=${name}&room=Memeroom`;


    }
    function clickdt(){

        setRoom('Dirtytalk');
        window.location = `/chat?name=${name}&room=Dirtytalk`;


    }
    function clickafk(){

        setRoom('AFK');
        window.location = `/chat?name=${name}&room=AFK`;


    }
}

export default Chat;
