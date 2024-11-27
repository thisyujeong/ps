/* DP 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const str1 = input[0];
const str2 = input[1];

function LCS(x, y) {
  const [n, m] = [x.length, y.length];
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (x[j - 1] === y[i - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

console.log(LCS(str1, str2));
