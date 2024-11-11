import yong from '../yong.js';

function Counter() {
  // let count = 0;
  const [count, setCount] = yong.useState(10);

  const handleDown = () => {
    // 데이터 갱신
    setCount(count - 1);
  };
  const handleUp = () => {
    // 데이터 갱신
    setCount(count + 1);
  };
  const handleReset = (event) => {
    // 데이터 갱신
    setCount(0);
  };

  return yong.createElement(
    'div',
    {id: 'counter'},
    yong.createElement('button', {type: 'button', onclick: handleDown}, '-'),
    yong.createElement(
      'button',
      {type: 'button', onclick: (event) => handleReset(event)},
      '0'
    ),
    yong.createElement('button', {type: 'button', onclick: handleUp}, '+'),
    yong.createElement('span', null, count)
  );
}

export default Counter;
