import React from 'react';

import "./Users.css";

import User from '../User/User';

const Users = ({users}) => {

    return (
            <div className="userList">
                <h3>Users in room</h3>
                    {users.map((us,i) => <div key={i}><User name={us.name}/></div>)}
            </div>

    )
}

export default Users;
