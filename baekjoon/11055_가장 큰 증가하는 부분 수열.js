/* 11053 가장 긴 증가하는 부분 수열 문제와 유사 */
const [N, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = parseInt(N);
const a = input.split(' ').map(Number);
const dp = [...a];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (a[j] < a[i] && dp[i] < dp[j] + a[i]) {
      dp[i] = dp[j] + a[i];
    }
  }
}
console.log(Math.max(...dp));
