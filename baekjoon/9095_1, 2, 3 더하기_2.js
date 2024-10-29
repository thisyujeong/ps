/**
 * DP문제
 * 숫자 N을 구성할 수 있는 수는 1, 2, 3
 * 즉, N을 표현할 수 있는 수는 N-1, N-2, N-3 숫자를 표현하는 수를 합한 것과 같음
 *
 * 점화식: dp[n] = dp[n-1] + dp[n-2] + dp[n-3]
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const nums = input.map(Number);
const dp = new Array(Math.max(...nums) + 1).fill(0);

dp[1] = 1;
dp[2] = dp[1] + 1;
dp[3] = dp[1] + dp[2] + 1;

for (let i = 4; i < dp.length; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

let result = '';
for (let k = 0; k < T; k++) {
  result += dp[nums[k]] + '\n';
}
console.log(result);
