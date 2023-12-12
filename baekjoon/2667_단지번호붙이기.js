/**
 * 집이 있는 좌표는 1로 표시되므로,
 * 방문한 집은 0으로 처리하고 1일 경우 방문하지 않은 집으로 간주
 *
 */
const input = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = +input.shift();
const count = []; // 각 단지에 속하는 집의 수
const graph = input.map((line) => line.split('').map(Number));
let home = 0;

// 상하좌우 탐색을 위한 좌표
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1) {
      dfs(i, j);
      count.push(home);
      home = 0;
    }
  }
}

count.sort((a, b) => a - b);
console.log(count.length);
count.forEach((cnt) => console.log(cnt));

// dfs
function dfs(x, y) {
  // 해당 좌표가 범위내에 있고 방문한 적이 없다면 수행
  if (rangeCheck(x, y) && graph[x][y] === 1) {
    // 방문처리
    graph[x][y] = 0;
    home += 1;

    // 상하좌우 탐색
    for (let k = 0; k < dx.length; k++) {
      dfs(x + dx[k], y + dy[k]);
    }
  }
}

// 상하좌우 범위 체크
function rangeCheck(x, y) {
  if (x >= 0 && x < n && y >= 0 && y < n) return true;
  return false;
}
