const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N: 수의 개수, M: 구해야하는 횟수
const nums = input.shift().split(' ').map(Number); // N개의 수
const ranges = input.map((v) => v.split(' ').map(Number)); // 구간

/* 1. 누적합 배열 구성 */
// const sum = nums.reduce(
//   (acc, cur, index) => {
//     acc[index + 1] = acc[index] + cur;
//     return acc;
//   },
//   [0]
// );

/* 2. 누적합 배열 구성 */
const sum = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  sum[i] += sum[i - 1] + nums[i - 1];
}

let result = '';
for (let i = 0; i < M; i++) {
  const [start, end] = ranges[i];
  result += sum[end] - sum[start - 1] + '\n';
}

console.log(result);
