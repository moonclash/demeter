import React from 'react';

export default function UserProfile(props) {
  return(<div className='user-profile'>
            <div className="user-pic">
                <h1>{props.userName}</h1>
            </div>
            <span className="user-calories">
                {props.userCalories}
            </span>
        </div>);
}