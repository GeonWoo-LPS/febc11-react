import {useState} from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({children = '0'}) {
  const initCount = Number(children);
  const [count, setCounter] = useState(initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    setCounter(count - step);
  };
  const handleUp = () => {
    setCounter(count + step);
  };
  const handleReset = (event) => {
    setCounter(initCount);
  };
  return (
    <div id='counter'>
      <label htmlFor='step'>증감치</label>
      {/* 제어 컴포넌트 value, onClick 사용 */}
      <input
        id='step'
        type='number'
        style={{width: '40px'}}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button color={'red'} onClick={handleDown}>
        -
      </Button>
      <Button onClick={handleReset}>{initCount}</Button>
      <Button color={'blue'} onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
