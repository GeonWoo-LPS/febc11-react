import {makeAutoObservable} from 'mobx';

class CounterStore {
  count = 5;

  constructor() {
    makeAutoObservable(this); // 상태 관찰
  }

  countUp(step) {
    this.count += step;
    console.log(this.count);
  }

  countDown(step) {
    this.count -= step;
  }

  countReset() {
    this.count = 0;
  }
}

export default new CounterStore();
