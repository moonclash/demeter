import React from 'react';

export default function FoodItem(props) {
  return (<div className="food-item">
            <h4>{props.name}</h4>
            <p>{props.calories} kcal</p>
            <div className="macros">
              <span className="macro-square protein">{props.protein}g</span>
              <span className="macro-square carbs">{props.carbs}g</span>
              <span className="macro-square fat">{props.fat}g</span>
            </div>
            <span onClick={()=>{props.onClick(props.id)}} className='add-remove'>{props.added? '✖' : '✚'}</span>
          </div>);
}