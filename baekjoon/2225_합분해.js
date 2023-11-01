/*
  0 ~ N 범위, K개(번) 더해서 N이 되는 경우의 수 구하는 문제
  dp[N][K] DP는 경우의 수 배열 | K는 정수의 개수 | N은 정수 K개의 합
  
  k = 1일경우, 정수 1개를 이용해 n이되어야 하는 경우는 무조건 n뿐이므로 경우의 수는 항상 1개 --> dp[n][1] = 1
  n = 0일경우, 정수 몇개(k)를 사용하더라도 경우의 수는 항상 1개 --> dp[0][k] = 1

  DP를 테이블로 그려보면 다음과 같음
  K \ N |   0   1   2   3   4
  -----------------------------
    1   |   1   1   1   1   1  
    2   |   1   2   3   4   5  
    3   |   1   3   6  10  15  

  점화식: dp[i][j] = dp[i][j - 1] + dp[i - 1][j];

  점화식 찾아내는게 쉽지 않았고 다음 영상을 참고해 점화식 도출 과정을 이해했음
  https://www.youtube.com/watch?v=8mFiz8pNZOw
*/
const fs = require('fs');
const [n, k] = fs.readFileSync('./input.txt').toString().split(' ').map(Number);
const dp = Array.from(new Array(k + 1), () => new Array(n + 1).fill(1));

for (let i = 2; i <= k; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % 1000000000;
  }
}
console.log(dp[k][n]);
