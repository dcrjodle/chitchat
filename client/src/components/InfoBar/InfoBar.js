import React from 'react';
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({name}) =>(
<div className="InfoBar">
    <div className='leftInnerContainer'>
        <h3>Welcome {name}!</h3>
    </div>
    <div className='rightInnerContainer'>
    </div>
</div>
)

export default InfoBar;