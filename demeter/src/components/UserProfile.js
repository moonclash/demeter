import React from 'react';

export default function UserProfile(props) {
  return(<div className='user-profile'>
            <div className="user-pic" style={{background: `linear-gradient(90deg,#1A237E,#311B92), url(${props.img})`}}>
                <h1>{props.userName}</h1>
            </div>
            <span className="user-calories">
                {props.userCalories}
            </span>
        </div>);
}