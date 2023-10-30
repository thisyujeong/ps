const [n, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const nums = input.split(' ').map(Number);
const dp = [...nums];
let max = dp[0];

for (let i = 1; i < parseInt(n); i++) {
  if (dp[i] < dp[i - 1] + nums[i]) {
    dp[i] = dp[i - 1] + nums[i];
  }
  max = dp[i] > max ? dp[i] : max;
}
console.log(max);
