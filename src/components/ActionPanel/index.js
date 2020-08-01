import React from 'react';
import { IoIosUndo, IoIosRedo, IoIosPlay } from 'react-icons/io';
import './ActionPanel.scss';

const nop = () => {};

export default function ActionPanel({
  onClickUndo,
  disableUndo,
  onClickReplay,
  disableReplay,
  onClickRedo,
  disableRedo,
}) {
  return (
    <div className='action-panel'>
      <div
        className='action-panel__group'
        style={{ opacity: disableUndo ? 0.3 : 1 }}
      >
        <IoIosUndo
          className={
            !disableUndo
              ? 'action-panel__button'
              : 'action-panel__button--disabled'
          }
          color='white'
          fontSize='100px'
          onClick={!disableUndo ? onClickUndo : nop}
        />
        Undo
      </div>
      <div
        className='action-panel__group'
        style={{ opacity: disableReplay ? 0.3 : 1 }}
      >
        <IoIosPlay
          className={
            !disableReplay
              ? 'action-panel__button'
              : 'action-panel__button--disabled'
          }
          color='white'
          fontSize='100px'
          onClick={!disableReplay ? onClickReplay : nop}
        />
        Replay
      </div>
      <div
        className='action-panel__group'
        style={{ opacity: disableRedo ? 0.3 : 1 }}
      >
        <IoIosRedo
          className={
            !disableRedo
              ? 'action-panel__button'
              : 'action-panel__button--disabled'
          }
          color='white'
          fontSize='100px'
          onClick={!disableRedo ? onClickRedo : nop}
        />
        Redo
      </div>
    </div>
  );
}
