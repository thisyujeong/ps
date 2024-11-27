/**
 * Node.js 로 풀기 불가능 - 메모리 초과
 * 버전 업데이트로 Node.js 가 사용하는 메모리가 늘어나 돌아가지 않음
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const grid = input.map((line) => line.split(' ').map(Number));
const dp = Array.from({ length: N }, () => new Array(5).fill([Infinity, 0]));

dp[0][1] = [grid[0][0], grid[0][0]];
dp[0][2] = [grid[0][1], grid[0][1]];
dp[0][3] = [grid[0][2], grid[0][2]];

for (let y = 1; y < N; y++) {
  for (let x = 1; x <= N; x++) {
    const [top, left, right] = [dp[y - 1][x], dp[y - 1][x - 1], dp[y - 1][x + 1]];
    const current = grid[y][x - 1];

    const min = Math.min(top[0] + current, left[0] + current, right[0] + current);
    const max = Math.max(top[1] + current, left[1] + current, right[1] + current);

    dp[y][x] = [min, max];
  }
}

let min = Infinity;
let max = 0;
for (let i = 1; i <= N; i++) {
  min = Math.min(min, dp[N - 1][i][0]);
  max = Math.max(max, dp[N - 1][i][1]);
}

console.log(max, min);
