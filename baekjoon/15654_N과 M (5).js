const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
nums.sort((a, b) => a - b);

const visited = new Array(n).fill(false);
const result = [];
let answer = '';

/* 백트래킹 */
function dfs(depth) {
  if (depth === m) {
    answer += result.join(' ') + '\n';
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    result[depth] = nums[i];
    dfs(depth + 1);
    visited[i] = false;
  }
}

dfs(0);
console.log(answer);
