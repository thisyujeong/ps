/* 경우의 수 
  1. 2x(n-1)만큼 타일링하고, 2x1 타일을 붙인다.
  2. 2x(n-2)만큼 타일링하고, 1x2 타일을 2개 붙인다.
  3. 2x(n-2)만큼 타일링하고, 2x2 타일을 1개 붙인다.

  점화식 => dp[n] = dp[n-1] + dp[n-2] * 2;
 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
const dp = new Array(n + 1).fill(1);

for (let i = 2; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 10007;
}

console.log(dp[n]);
