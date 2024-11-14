/// Array.prototype.reduce(callback, initialValue): 배열의 각 요소에 대해 콜백 함수를 실행
// callback(accumulater-누적값, currentValue-현재값, index, array)
// initialValue가 주어지는 누적값의 초기값으로 사용
// initialValue가 주어지지 않으면 배열의 첫번째 요소가 누적값의 초기값으로 사용되고 두번쨰 요소부터 콜백함수가 호출

// 배열 요소중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // 홀수 일때 sum에 num 누적해서 반환
  } else {
    return sum; // 짝수 일때 이전 sum을 그대로 반환
  }
}, 0);

var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum; // 홀수 일때 누적한다
}, 0);

var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);

var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result);
