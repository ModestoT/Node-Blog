import React from 'react';
import { Link } from 'react-router-dom';

import User from './User';

const UsersList = props => {
    return(
        <div className="users-list-wrapper">
            {props.users.map(user => {
               return <Link to = {`/users/${user.id}`} key={user.id}><User user={user} /></Link>
            })}
        </div>
    );
};

export default UsersList;