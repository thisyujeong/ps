const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const nums = input.map(Number);
const max = Math.max(...nums);
const dp = new Array(max + 1).fill([0, 0]);

dp[0] = [1, 0];
dp[1] = [0, 1];

for (let i = 2; i <= max; i++) {
  dp[i] = [dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1]];
}

let result = '';
for (let i = 0; i < T; i++) {
  result += dp[input[i]].join(' ') + '\n';
}

console.log(result);
