const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift(); // T ≤ 100
const answer = [];

/**
 * JS 배열은 큐를 지원하지 않기 때문에 shift 연산은 O(n)의 연산을 필요로 함
 * 연산량을 줄이기 위한 방법중 직접 큐를 구현할 수 있지만, 배열의 인덱스와 reverse함수를 활용하여 정답을 추출할 수 있음
 * 1. R 함수를 실행할 때마다 reverse 여부를 체크함
 * 2. D 함수를 실행할 때마다 reverse 여부에 따라 start 포인터를 증가시키거나, end 포인터를 감소시킨다.
 */
for (let i = 0; i < input.length; i += 3) {
  const p = input[i];
  const n = +input[i + 1];
  const arr = JSON.parse(input[i + 2]);

  let isReversed = false;
  let isError = false;
  let start = 0;
  let end = n - 1;

  for (const cmd of p) {
    if (cmd === 'R') {
      isReversed = !isReversed;
    }
    if (cmd === 'D') {
      if (start > end) {
        isError = true;
        break;
      }
      if (isReversed) end--;
      else start++;
    }
  }

  const result = arr.slice(start, end + 1);
  answer.push(isError ? 'error' : JSON.stringify(isReversed ? result.reverse() : result));
}

console.log(answer.join('\n'));
