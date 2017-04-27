import React from 'react';

export default function SettingsPanel(props) {
  return(<div className='settings-panel'>
          <h3>Settings</h3>
          <input onChange={props.nameChange} type="text"/>
          <input onChange={props.calorieChange} type="text"/>
          <input onChange={props.imageChange} type="file"/>
        </div>)
}