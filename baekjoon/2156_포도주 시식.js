/**
  n까지의 포도주 잔이 주어졌을 때
  주어진 포도주를 wines[n], 마실 수 있는 양의 최대 값을 dp[n]이라고 가정

  포도주를 마실 수 있는 경우의 수
  - n번째 포도주와 n-1번째 포도주를 마실 경우, n-2번째 포도주는 마실 수 없으므로 n-3번째까지의 최대값을 더한다.
  - n번째 포도주를 마시고 n-1번째 포도주를 건너뛸 경우, n-2번째까지의 최대값을 더한다.
  - n번째 포도주를 마시지 않을 경우, n-1번째 까지 최대값을 그대로 가져간다.

  점화식으로 나타내면 다음과 같음
  1. dp[n-3] + wines[n-1] + wines[n] 
  2. dp[n-2] + wines[n]
  3. dp[n-1]

  따라서, 위 점화식의 값 중 최대값을 dp[n]에 저장
  dp[n] = Math.max(dp[n-3] + wines[n-1] + wines[n], dp[n-2] + wines[n], dp[n-1]);
 */

const [n, ...wines] = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(Number);
const dp = new Array(n).fill(0);

dp[0] = wines[0];
dp[1] = wines[0] + wines[1];
dp[2] = Math.max(wines[0] + wines[2], wines[1] + wines[2], dp[1]);

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(dp[i - 3] + wines[i - 1] + wines[i], dp[i - 2] + wines[i], dp[i - 1]);
}

console.log(dp[n - 1]);
