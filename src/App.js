import React, { useState, useEffect } from 'react';
import Block from './components/Block';
import './App.scss';
import cloneDeep from 'lodash.clonedeep';
import useEvent from './Hooks/useEvent';

function App() {

  const UP = 38;
  const DOWN = 40;
  const LEFT = 37;
  const RIGHT = 39;
  // const STOP = 27;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Inititalize
  const initialize = () => {
    let newGrid = cloneDeep(data);

    addItem(newGrid);

    addItem(newGrid);

    setData(newGrid);
  };
  // Add item
  const addItem = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;

    while (!added) {
      if (!gridFull) {
        break;
      }
    }

    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    attempts++;

    if (newGrid[rand1][rand2] === 0) {
      newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  };

  // Swipe action

  const swipeLeft = () => {
    console.log(' it is calling swipe left');
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if ((fast === 4)) {
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

    if(JSON.stringify(oldGrid)!==JSON.stringify(newArray)) {
      addItem(newArray);
    }

    setData(newArray);
  };

  const swipeRight = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for(let i=3;i>=0;i--) {
      let b = newArray[i];
      let slow = b.length-1;
      let fast= slow-1;

      while(slow>0) {
        if(fast===-1){
          fast=slow-1;
          slow--;
          continue;
        }
        if(b[slow]===0 &&b[fast]===0) {
          fast--;
        } else if(b[slow]===0&&b[fast]!==0){
          b[slow]=b[fast];
          b[fast]=0;
          fast--;
        } else if(b[slow]!==0 && b[fast]===0) {
          fast--;
        } else if(b[slow]!==0&&b[fast]!==0) {
          if(b[slow]===b[fast]) {
            b[slow]=b[slow]+b[fast];
            b[fast]=0;
            fast=slow-1;
            slow--;
          } else {
            slow--;
            fast=slow-1;
          }
        }
      }
    }
    if(JSON.stringify(oldGrid)!==JSON.stringify(newArray)) {
      addItem(newArray);
    }

    setData(newArray);
  }

  const swipeDown = () => {
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));

    for(let i=3; i>=0;i--) {
      let slow = b.length-1;
      let fast = slow-1;

      while(slow>0) {
        if(fast===-1) {
          fast=slow-1;
          slow--;
          continue;
        }

        if(b[slow][i]===0&&b[fast][i]===0) {
          fast--;
        }else if(b[slow][i]===0&&b[fast][i]!==0) {
          b[slow][i]=b[fast][i];
          b[fast][i]=0;
          fast--;
        } else if(b[slow][i]!==0&&b[fast][i]===0) {
          fast--;
        }else if(b[slow][i]!==0&&b[fast][i]!==0) {
          if(b[slow][i]===b[fast][i]) {
            b[slow][i] = b[slow][i]+b[fast][i];
            b[fast][i]=0;
            fast=slow-1;
            slow--;
          } else {
            slow--;
            fast=slow-1;
          }
        }
      }
    }

    if(JSON.stringify(oldData)!==JSON.stringify(b)) {
      addItem(b);
    };

    setData(b);
  }

  const swipeUp = () => {
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));
    
    for(let i=0; i<4;i++){
      let slow=0;
      let fast=1;

      while(slow<4){
        if(fast===4){
          fast=slow+1;
          slow++;
          continue;
        }
        if(b[slow][i]===0&&b[fast][i]===0) {
          fast++;
        } else if(b[slow][i]===0&&b[fast][i]!==0) {
          b[slow][i]=b[fast][i];
          b[fast][i]=0;
          fast++;
        } else if(b[slow][i]!==0&&b[fast][i]===0) {
          fast++;
        } else if(b[slow][i]!==0&&b[fast][i]!==0) {
          if(b[slow][i]===b[fast][i]) {
            b[slow][i] = b[slow][i]+b[fast][i];
            b[fast][i]=0;
            fast=slow+1;
            slow++;
          } else {
            slow++;
            fast=slow+1;
          }
        }
      }
    }

    if(JSON.stringify(oldData)!==JSON.stringify(b)) {
      addItem(b);
    };

    setData(b);
  }

  //TODO: Check gameover

  //TODO: Reset

  const handleKeyDown = (event) => {
    switch(event.keyCode) {
      case UP: swipeUp(); break;
      case DOWN: swipeDown(); break;
      case LEFT: swipeLeft(); break;
      case RIGHT: swipeRight(); break;
      default: break;
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEvent("keydown", handleKeyDown);

  return (
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
  );
}

export default App;
