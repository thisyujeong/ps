// 이분탐색 문제
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0];
const A = input[1].split(' ').map(Number);
const M = +input[2];
const X = input[3].split(' ').map(Number);

// 이분탐색 사전 조건 - 정렬된 수
A.sort((a, b) => a - b);
function solution(num) {
  let max = N - 1;
  let min = 0;
  while (min <= max) {
    const mid = Math.floor((max + min) / 2);
    if (A[mid] === num) return 1;
    if (A[mid] > num) max = mid - 1;
    if (A[mid] < num) min = mid + 1;
  }
  return 0;
}

let result = '';
for (let i = 0; i < M; i++) {
  result += solution(X[i]) + '\n';
}

console.log(result);
