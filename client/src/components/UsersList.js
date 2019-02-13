import React from 'react';

import User from './User';

const UsersList = props => {
    return(
        <div className="users-list-wrapper">
            {props.users.map(user => {
                <User user={user} />
            })}
        </div>
    );
};

export default UsersList;