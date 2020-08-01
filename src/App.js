import React, { useEffect } from 'react';
import Block from './components/Block';
import './App.scss';
import cloneDeep from 'lodash.clonedeep';
import useEvent from './Hooks/useEvent';
import useLocalStorage from './Hooks/useLocalStorage';
import getNewPosition from './utils/getNewPosition';
import isExist from './utils/isExist';
import Header from './components/Header';
import ActionPanel from './components/ActionPanel';

function App() {
  const UP = 38;
  const DOWN = 40;
  const LEFT = 37;
  const RIGHT = 39;
  // const STOP = 27;

  const INITIAL_DATA = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const [data, setData] = useLocalStorage('data', INITIAL_DATA);
  const [newGame, setNewGame] = useLocalStorage('newGame', true);
  const [score, setScore] = useLocalStorage('score', 0);
  const [best, setBest] = useLocalStorage('best', 0);
  const [scoreHistory, setScoreHistory] = useLocalStorage('scoreHistory', []);
  const [isWon, setIsWon] = useLocalStorage('isWon', false);
  const [moveHistory, setMoveHistory] = useLocalStorage('moveHistory', []);
  const [undoMoves, setUndoMoves] = useLocalStorage('undoMoves', []);
  const [replayStatus, setReplayStatus] = useLocalStorage('replayStatus', false);

  // Inititalize
  const initialize = () => {
    let newGrid = cloneDeep(data);

    addItem(newGrid);

    addItem(newGrid);

    setData(newGrid);
    setNewGame(false);
  };

  // Add item
  const addItem = (newGrid) => {
    console.log('its calling addItem');
    // let added = false;
    // let gridFull = false;
    // let attempts = 0;

    // while (!added) {
    //   if (!gridFull) {
    //     break;
    //   }
    // }

    // if(isExist(newGrid, 64)) {
    //   alert('congratulations');
    //   return;
    // }
    let [rand1, rand2] = getNewPosition(newGrid);

    while (newGrid[rand1][rand2] !== 0) {
      [rand1, rand2] = getNewPosition(newGrid);
    }
    // attempts++;

    // if (newGrid[rand1][rand2] === 0) {
    newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;

    // added = true;
    // }
    // if(attempts>50) {
    //   gridFull = true;
    //   let gameOver = checkGameOver();
    //   if(gameOver) alert('GAME OVER')
    // }
  };

  // Swipe action

  const swipeLeft = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('congratz');
      return;
    }

    if(replayStatus) {
      return;
    }
    
    if(undoMoves.length) {
      setUndoMoves([]);
    }

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            setScore(score + b[slow]);
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      setMoveHistory([...moveHistory, oldGrid]);
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
        alert('congratulations');
      } else addItem(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('GAME OVER');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const swipeRight = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('congratz');
      return;
    }

    if(replayStatus) {
      return;
    }

    if(undoMoves.length) {
      setUndoMoves([]);
    }

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            setScore(score + b[slow]);
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      setMoveHistory([...moveHistory, oldGrid]);
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
        alert('congratulations');
        return;
      } else addItem(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('GAME OVER');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const swipeDown = (isMove = true) => {
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));

    if (isWon) {
      alert('congratz');
      return;
    }

    if(replayStatus) {
      return;
    }

    if(undoMoves.length) {
      setUndoMoves([]);
    }

    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;

      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            setScore(score + b[slow][i]);
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }

    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      setMoveHistory([...moveHistory, oldData]);
      if (isExist(b, 2048)) {
        setIsWon(true);
        setData(b);
        alert('congratulations');
      } else addItem(b);
    } else if (!isExist(oldData) && isMove && checkGameOver()) {
      alert('GAME OVER');
    }

    if (isMove) {
      setData(b);
    } else return b;
  };

  const swipeUp = (isMove = true) => {
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));

    if (isWon) {
      alert('congratz');
      return;
    }

    if(replayStatus) {
      return;
    }

    if(undoMoves.length) {
      setUndoMoves([]);
    }

    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            setScore(score + b[slow][i]);
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      setMoveHistory([...moveHistory, oldData]);
      if (isExist(b, 2048)) {
        setIsWon(true);
        setData(b);
        alert('congratulations');
      } else addItem(b);
    } else if (!isExist(oldData) && isMove && checkGameOver()) {
      alert('GAME OVER');
    }

    if (isMove) {
      setData(b);
    } else return b;
  };

  const checkGameOver = () => {
    if (JSON.stringify(data) !== JSON.stringify(swipeLeft(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeRight(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeUp(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeDown(false))) {
      return false;
    } else return true;
  };

  // Reset, New Game
  const onClickNewGame = () => {
    setScoreHistory([...scoreHistory, score]);
    setMoveHistory([]);
    setUndoMoves([]);
    setIsWon(false);
    setNewGame(true);
    setScore(0);
    setData(INITIAL_DATA);
  };

  // Undo
  const onClickUndo = () => {
    const history = cloneDeep(moveHistory);
    const lastMove = history.pop();
    setMoveHistory(history);
    setUndoMoves([...undoMoves, data])
    setData(lastMove);
  };

  // Replay
  const onClickReplay = () => {
    setReplayStatus(true);
    const history = cloneDeep(moveHistory);
    history.push(data);
    for (let i = 0; i < history.length; i++) {
      setTimeout(() => {
        console.log('replay in progress', i);
        setData(history[i]);
        if(i===history.length-1) {
          setReplayStatus(false)
        }
      }, i * 1000);
    }
  };

  // Redo
  const onClickRedo = () => {
    const history = cloneDeep(moveHistory);
    const uMoves = cloneDeep(undoMoves);
    const nextMove = uMoves.pop();
    history.push(data);
    setMoveHistory(history);
    setUndoMoves(uMoves);
    setData(nextMove);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP:
        swipeUp();
        break;
      case DOWN:
        swipeDown();
        break;
      case LEFT:
        swipeLeft();
        break;
      case RIGHT:
        swipeRight();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (newGame) {
      initialize();
    }
  }, [newGame]);

  useEffect(() => {
    setBest(Math.max(...scoreHistory, score));
  }, [score]);

  useEvent('keydown', handleKeyDown);

  return (
    <div className='wrapper'>
      <div className='app-wrapper'>
        <Header score={score} best={best} onClickNewGame={onClickNewGame} />
        <div className='App'>
          {data.map((row, rowIndex) => {
            return (
              <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((num, index) => (
                  <Block num={num} key={index} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <ActionPanel
          onClickUndo={onClickUndo}
          disableUndo={!moveHistory.length || replayStatus}
          onClickReplay={onClickReplay}
          disableReplay={replayStatus}
          onClickRedo={onClickRedo}
          disableRedo={!undoMoves.length || replayStatus}
        />
      </div>
    </div>
  );
}

export default App;
