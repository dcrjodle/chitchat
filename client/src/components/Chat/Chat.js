import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Users from '../Users/Users';


let socket;


const Chat = ({location}) => {
    const[name, setName]= useState('');
    const[room, setRoom]= useState('');
    const[id, setId]= useState('');
    const[messages, setMessages]= useState([]);
    const[message, setMessage]= useState('');
    const[users, setUsers]= useState([]);


    const ENDPOINT = 'https://young-beach-90877.herokuapp.com/';


    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        console.log(name, room);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, ()=>{

        });

        return () => {
            socket.emit('disconnect')
            socket.off();
        }

        //console.log(socket);
    }, [ENDPOINT, location.search])

    useEffect(() =>{
        socket.on('roomData', (user)=> {
            console.log(user.name);
            
            setUsers([...users, user]);
            


        })
        }, [users]);


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
            <h1 className="heading">ChitChat</h1>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <Messages className="messages" messages ={messages} name={name}/>
                    <Input message ={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div> 
            </div>
            <h3 className="rooms">Rooms</h3>
            <div className="roomButtons">
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
           
           <Users users={users} room={room}/>
        </div>
    )

    function clickr(){

        
        window.location = `/chat?name=${name}&room=Random`;
<<<<<<< HEAD
        setRoom('Random');
=======
>>>>>>> 4285df2dd5ebbc81d774418cd1a51580b0407575

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
