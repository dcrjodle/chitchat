import React from 'react';
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';
import './InfoBar.css';


const InfoBar = ({room}) =>(
<div className="InfoBar">
    <div className='leftInnerContainer'>
        <img className="onlineIcon" src={onlineIcon} alt="online image"/>
        <h3 className="room">{room}</h3>
    </div>
    <div className='rightInnerContainer'>
        <a href="/"><img src={closeIcon} alt="close image"/></a>
    </div>
</div>
)

export default InfoBar;