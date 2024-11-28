import {useEffect} from 'react';
import {useSelector} from 'react-redux';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  // useSelector() 훅으로 스토어 접근(자동으로 구독이 됨)
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
