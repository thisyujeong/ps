const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
nums.sort((a, b) => a - b);

const result = [];
const answer = [];

/* 백트래킹 */
function dfs(depth, start) {
  if (depth === m) {
    answer.push(result.join(' '));
    return;
  }

  for (let i = start; i < n; i++) {
    result[depth] = nums[i];
    dfs(depth + 1, i);
  }
}

dfs(0, 0);
console.log([...new Set(answer)].join('\n'));
