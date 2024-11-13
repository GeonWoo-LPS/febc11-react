function f1() {
  console.log(`2. f1 작업 시작.`); // 2
  console.log(`3. f1 작업중...`); // 3
  // ......
  console.log(`4. f1 작업 종료.`); // 4
  return `f1의 결과물`;
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`); // 5
  console.log(`6. f2 작업중...`); // 6
  // ......
  console.log(`7. f2 작업 종료.`); // 7
  return `최종 결과물`;
}

function test() {
  const f1Result = f1();
  const result = f2(f1Result);
  console.log('8.', result); // 8
}

console.log('1. 테스트 시작.'); // 1
test();
console.log('9 .테스트 완료.'); // 9
