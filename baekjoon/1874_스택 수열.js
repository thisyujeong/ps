const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const targets = input.map(Number); // 목표 수열

/* 풀이 1 - 개선 및 분석 */
const stack = [];
let answer = [];
let current = 1;

for (let i = 0; i < n; i++) {
  const target = targets[i]; // 목표 수열

  /**
   * 이 문제에서 스택은 1부터 n까지의 숫자를 "오름차순"으로 push하기 때문에
   * POP을 실행하기 전까지 현재 최상위에 위치한 값(current)이 목표값보다 큰 값일 수 없다.
   * 때문에 목표값과 같거나 작을 때까지만 while loop를 수행한다.
   */
  while (current <= target) {
    stack.push(current);
    answer.push('+');
    current++;
  }

  const top = stack.pop();
  answer.push('-');

  // 최상위에 위치한 값이 목표한 값과 일치하지 않다면 이루어질 수 없는 수열 'NO'
  if (top !== target) {
    answer = ['NO'];
    break;
  }
}

console.log(answer.join('\n'));

/* 풀이 2 - 불필요한 loop 실행으로 인해 런타임이 풀이 1에 비해 약 5배이상 차이남 */
// let answer = [];
// let stack = [];
// let current = 1;
function solution() {
  while (arr.length > 0) {
    let target = arr[0];
    let top = stack.at(-1) || null;

    // 불필요한 loop 실행이 잦음 -> 조건문을 개선하여 줄일 수 있음
    if (top === target) {
      stack.pop();
      answer.push('-');
      arr.shift();
    }

    stack.push(current);
    answer.push('+');
    current++;

    if (current > n && stack.length !== arr.length) {
      answer = ['NO'];
      break;
    }
  }
}
solution();
console.log(answer.join('\n'));
