import yong from '../yong.js';
import Counter from './Counter.js';
import Header from './Header.js';

// 어플리케이션의 시작점
function App() {
  return yong.createElement('div', {id: 'app'}, Header, Counter);
}

export default App;
