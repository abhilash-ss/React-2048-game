import React from 'react';
import { IoIosUndo, IoIosRedo, IoIosPlay } from 'react-icons/io';
import './ActionPanel.scss';

export default function ActionPanel() {
  return (
    <div className='action-panel'>
      <div className='action-panel__group'>
        <IoIosUndo
          className='action-panel__button'
          color='white'
          fontSize='100px'
        />
        Undo
      </div>
      <div className='action-panel__group'>
        <IoIosPlay
          className='action-panel__button'
          color='white'
          fontSize='100px'
        />
        Replay
      </div>
      <div className='action-panel__group'>
        <IoIosRedo
          className='action-panel__button'
          color='white'
          fontSize='100px'
        />
        Redo
      </div>
    </div>
  );
}
