import React from 'react';
import getColour from '../../utils/getColours';
import './Block.scss';

export default function Block({ num }) {
  return (
    <div
      className='block'
      style={{ background: getColour(num), color: num !== 0 && '#645B52' }}
    >
      {num ? num : ''}
    </div>
  );
}
