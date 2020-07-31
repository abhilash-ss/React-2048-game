import React from 'react';
import './Header.scss';

export default function Header({ score, best }) {
  return (
    <div className='header'>
      <div className='header__group'>
        <h1 className='header__title'>2048</h1>
        <div className='header__score-container'>
          <div className='header__score-box'>
            <span className='header__score-box--title'>SCORE</span>
            <span>{score}</span>
          </div>
          <div className='header__score-box'>
            <span className='header__score-box--title'>BEST</span>
            <span>{best}</span>
          </div>
        </div>
      </div>
      <p>Join the number and get to the 2048 tile!</p>
    </div>
  );
}
