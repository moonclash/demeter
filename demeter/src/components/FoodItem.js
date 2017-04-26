import React from 'react';

export default function FoodItem(props) {
  return (<div className="food-item">
            <h4>{props.name}</h4>
            <p>{props.calories} kcal</p>
            <span className="macro-square protein">{props.protein}</span>
            <span className="macro-square carbs">{props.carbs}</span>
            <span className="macro-square fat">{props.fat}</span>
          </div>);
}