import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = () => {
    const[name, setName]= useState('');
    const[room, setRoom]= useState('');

    return (
   <div className="joinOuterContainer">
       <div className="joinInnerContainer">
           <h1 className="heading">Welcome to ChitChat</h1>
           <div><input placeholder="Enter your alias..." className="joinInput" type="text" onChange={(event) => setName(event.target.value) & setRoom("general")}></input></div>
           

        
           
           <Link onClick={event =>(!name || !room)? event.preventDefault(): null} to={ `/chat?name=${name}&room=general`}>
           <div className="space"></div>
           <button className="button mt-20" type="submit">Join</button>
           </Link>


       </div>
   </div>
    )
}


export default Join;