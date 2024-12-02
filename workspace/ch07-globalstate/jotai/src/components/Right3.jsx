import {counterAtom} from '../jotai/atoms.js';
import {useSetAtom} from 'jotai';
import {useEffect} from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // getter/setter 모두 구독
  // const [count, setCount] = useAtom(counterAtom);
  // const countUp = function (step) {
  //   setCount(count + step);
  // };

  // setter만 사용(구독하지 않음)
  const setCount = useSetAtom(counterAtom);

  const countUp = function (step) {
    setCount((count) => count + step);
  };

  const countDown = function (step) {
    setCount((count) => count - step);
  };

  const countReset = function () {
    setCount(0);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countDown(1)}>-1</button>
      <button onClick={() => countReset()}>0</button>
      <button onClick={() => countUp(2)}>+2</button>
    </div>
  );
}

export default Right3;