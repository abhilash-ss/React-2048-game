import React from 'react';
import './Popup.scss';

export default function Popup({ message, buttons }) {
  return (
    <div className='popup'>
      <div className='popup__message'>{message}</div>
      <div className='popup__footer'>
        {buttons.map((btn) => (
          <button className='popup__button' onClick={btn.onClick}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
