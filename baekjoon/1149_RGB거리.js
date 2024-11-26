const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const costs = input.map((v) => v.split(' ').map(Number));
const dp = Array.from({ length: n }, () => new Array(3).fill(0));

dp[0] = costs[0];

for (let i = 1; i < n; i++) {
  const [r, g, b] = costs[i]; // cur r, cur g, cur b
  const [_r, _g, _b] = dp[i - 1]; // prev r, prev g, prev b
  dp[i][0] = Math.min(r + _g, r + _b); // r
  dp[i][1] = Math.min(g + _r, g + _b); // g
  dp[i][2] = Math.min(b + _r, b + _g); // b
}

console.log(Math.min(...dp[n - 1]));
