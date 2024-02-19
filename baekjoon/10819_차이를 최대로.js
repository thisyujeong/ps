/**
 * 풀이를 봐도 계산하는게 너무 어렵다.
 * TODO: 다시 풀어볼 것
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = parseInt(input[0]);
const nums = input[1].split(' ').map(Number);
let visited = new Array(n).fill(0);
let max = 0;

function solve(temp, cnt, sum) {
  if (cnt === n) {
    if (max < sum) max = sum;
    console.log(max);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = 1;
    solve(nums[i], cnt + 1, sum + Math.abs(temp - nums[i]));
    visited[i] = 0;
  }
}

for (let i = 0; i < 2; i++) {
  visited[i] = 1;
  solve(nums[i], 1, 0);
  visited[i] = 0;
}

console.log(max);
