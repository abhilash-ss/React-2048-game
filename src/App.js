import React, { useState } from 'react';
import Block from './components/Block';
import './App.scss';

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return (
    <div className='App'>
      {data.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{display: 'flex'}}>
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
