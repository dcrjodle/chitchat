import React from 'react';

import "./Users.css";

import User from '../User/User';

const Users = ({users}) => {

    return (
            <div className="userList">
                <h3>Users in room</h3>
                {users.map((user, i) => <div key={i}><User user={user}/></div>)}
            </div>

    )
}

export default Users;
