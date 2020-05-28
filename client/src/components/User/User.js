import React from 'react';

import "./User.css";

const User = ( { name } ) => {
    
    return (
    <div className="inThisRoom">
    <p> {name}</p>
    </div>
      
    )
}

export default User;
