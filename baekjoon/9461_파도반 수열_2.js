/* DP 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const nums = input.map(Number);

const dp = [0, 1, 1, 1, 2];

for (let i = 5; i < 101; i++) {
  dp[i] = dp[i - 5] + dp[i - 1];
}

let result = '';
for (let k = 0; k < T; k++) {
  result += dp[nums[k]] + '\n';
}

console.log(result);
