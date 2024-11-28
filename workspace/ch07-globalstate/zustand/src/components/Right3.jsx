import useCounterState from '@zustand/counter';
import {useEffect} from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // count를 사용하지 않아도 자동으로 구독이 되기 때문에 count 변경시 리랜더링 됨
  // const {countUp} = useCounterState();

  const countUp = useCounterState((state) => state.countUp);

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
