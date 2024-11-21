import {useReducer, useRef, useState} from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import {current} from 'immer';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({children = '0'}) {
  const initCount = Number(children);

  // const [count, setCounter] = useState(initCount)
  const [count, countDispatch] = useReducer(counterReducer, initCount);
  const step = useRef(1); // {current: 1} 반환
  const stepElem = useRef(null);

  const handleDown = () => {
    countDispatch({type: 'DOWN', value: step.current});
  };
  const handleUp = () => {
    countDispatch({type: 'UP', value: step.current});
  };
  const handleReset = (event) => {
    // setCount(initCount)
    countDispatch({type: 'RESET', value: initCount});
    // const stepElem = document.querySelector('#step')
    console.log(stepElem);
    stepElem.current.focus();
  };

  // useEffect(() => {
  //   console.log('setUp 함수 호출');
  //   const timer = setInterval(() => {
  //     console.log(new Date());
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div id='counter'>
      <label htmlFor='step'>증감치</label>
      {/* 비제어 컴포넌트 value, onChange 사용 */}
      <input
        id='step'
        type='number'
        style={{width: '40px'}}
        defaultValue={step.current}
        onChange={(e) => (step.current = Number(e.target.value))}
        ref={stepElem}
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

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 로직을 컴포넌트 내부에서 직접 구현하지 않고 외부에서 구현
// state: 이전 상태(useReducer가 내부적으로 관리, 이전의 리턴값이 다음의 state로 전달)
// action: 동작을 정의한 객체
function counterReducer(state, action) {
  // (6, {type: 'UP', value: 1})
  let newState;

  switch (action.type) {
    case 'DOWN':
      newState = state - action.value;
      break;
    case 'UP':
      newState = state + action.value;
      break;
    case 'RESET':
      newState = action.value;
      break;
    default:
      newState = state;
  }

  return newState;
}

export default Counter;