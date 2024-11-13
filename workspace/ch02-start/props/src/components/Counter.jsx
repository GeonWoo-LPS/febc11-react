import React from 'react';
import Button from './Button';

function Counter() {
  // let count = 0;
  let [count, setCounter] = React.useState(0);

  const handleDown = () => {
    setCounter(count - 1);
  };
  const handleUp = () => {
    setCounter(count + 1);
  };
  const handleReset = (event) => {
    setCounter(0);
  };
  return (
    <div id='counter'>
      <Button color='red' onClick={handleDown}>
        -
      </Button>
      <Button onClick={(event) => handleReset(event)}>0</Button>
      <Button color='blue' onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
