import React from 'react';

//import icons

import './InfoBar.css';

const infoBar = ({name}) =>(
<div className="InfoBar">
    <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt="online image"> </img>
        <h3>Welcome {name} !</h3>
    </div>
    <div className='rightInnerContainer'>
        <a href="/"> <img src={closeIcon} alt="close image"></img></a>
    </div>
</div>
)

export default InfoBar;