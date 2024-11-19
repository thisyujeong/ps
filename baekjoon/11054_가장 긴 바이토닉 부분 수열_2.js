/**
 * TODO: 다시 풀기
 * 접근 방법 아이디어 생각해내기
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0];
const A = input[1].split(' ').map(Number);

const increaseDP = new Array(N).fill(1);
const decreaseDP = new Array(N).fill(1);

// 1. 정방향에서 증가 수열 길이 구하기
for (let i = 0; i < N; i++) {
  const cur = A[i];
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    if (A[j] < cur) {
      cnt = Math.max(cnt, increaseDP[j] + 1);
    }
  }
  increaseDP[i] = cnt;
}

// 2. 역방향에서 감소 수열 길이 구하기
for (let i = N - 1; i >= 0; i--) {
  const cur = A[i];
  let cnt = 1;
  for (let j = i + 1; j < N; j++) {
    if (A[j] < cur) {
      cnt = Math.max(cnt, decreaseDP[j] + 1);
    }
  }
  decreaseDP[i] = cnt;
}

// 3. 증가 수열과 감소 수열의 같은 인덱스를 더하여 - 1 한 값이 가장 큰 값인 길이 찾기
let max = 0;
for (let k = 0; k < N; k++) {
  max = Math.max(max, increaseDP[k] + decreaseDP[k] - 1);
}

console.log(max);
