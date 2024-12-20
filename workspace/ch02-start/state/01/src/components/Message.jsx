import {useState} from 'react';

// 모듈 스코프 변수 X
// let count = 0;

export default function Message() {
  // console.log('Message 렌더링');

  // 지역 변수 x
  // let count = 0;

  // state 사용
  const [count, setCount] = useState(0);

  const [msg, setMsg] = useState('');

  const handleChange = (evnet) => {
    const inputMsg = evnet.target.value;
    setMsg(inputMsg);
    setCount(count + 1);
  };
  return (
    <div>
      <input type='text' onChange={handleChange} />
      <br />
      <span>입력 메세지 : {msg}</span>
      <br />
      <span>입력 횟수 : {count} </span>
    </div>
  );
}
