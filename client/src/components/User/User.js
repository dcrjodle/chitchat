import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'


const User = ( {user: {id, name, room}} ) => {
    
    return (
    <div>
    <p>{name} i rummet</p>
    </div>
      
    )
}

export default User;
