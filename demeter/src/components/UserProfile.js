import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


export default function UserProfile(props) {
  return(<div className='user-profile'>
            <div className="user-pic" style={{background: `linear-gradient(90deg,#1A237E,#311B92), url(${props.img})`}}>
                <h1>{props.userName}</h1>
                <span className="user-calories calories_goal">
                  {Math.round(props.userCalories)} kcal
                </span>
                <span className="user-calories calories_total">
                  {Math.round(props.totalCalories)} kcal
                </span>
                <div className="user-macros">
                  <span className="macro-square protein">{Math.round(props.protein)}</span>
                  <span className="macro-square carbs">{Math.round(props.carbs)}</span>
                  <span className="macro-square fat">{Math.round(props.fat)}</span>
                </div>
            </div>
            
            <CSSTransitionGroup
              transitionName='food'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              >
              {props.children}
            </CSSTransitionGroup>
           
        </div>);
}