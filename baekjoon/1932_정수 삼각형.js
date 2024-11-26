/**
 * DP문제
 * 점화식:
 * 1. dp[r][c] = Math.max(dp[r-1][c-1] + num[r][c], dp[r-1][c] + num[r][c])
 *
 * 2. 각 층의 첫번째 요소라면 위층의 첫번째 요소를 통한 경로만 가능
 *    dp[r][0] = dp[r-1][0] + num[r][0]
 *
 * 3. 각 층의 마지막 요소라면 위층의 마지막 요소를 통한 경로만 가능
 *    dp[r][c] = dp[r-1][c-1] + num[r][c]
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const arr = input.map((v) => v.split(' ').map(Number));
const dp = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(0));
dp[0] = arr[0];

for (let i = 1; i < n; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][0] + arr[i][j];
    } else if (i === j) {
      dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j - 1] + arr[i][j], dp[i - 1][j] + arr[i][j]);
    }
  }
}

console.log(Math.max(...dp[n - 1]));
