/* 유사 문제: 11053 가장 긴 증가하는 부분 수열, 11055 가장 큰 증가하는 부분 수열 */
const [N, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = parseInt(N);
const a = input.split(' ').map(Number);
const dp = new Array(parseInt(n)).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (a[j] > a[i] && dp[i] < dp[j] + 1) {
      dp[i] = dp[j] + 1;
    }
  }
}

console.log(dp);
