const n = +require('fs').readFileSync('./input.txt').toString().trim();
const dp = new Array(n + 1).fill(1);

for (let i = 2; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[n]);
