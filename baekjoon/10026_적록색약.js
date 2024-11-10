const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const matrix = input.map((line) => line.split(''));
const visited = Array.from({ length: N }, () => Array.from({ length: N }).fill(0));

const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function bfs(r, c, color) {
  const queue = [[r, c]];
  visited[r][c] = 1;

  while (queue.length) {
    const [row, col] = queue.shift();
    for (const [dr, dc] of direction) {
      const [nr, nc] = [row + dr, col + dc];
      if (isRange(nr, nc) && !visited[nr][nc] && matrix[nr][nc] === color) {
        queue.push([nr, nc]);
        visited[nr][nc] = 1;
      }
    }
  }
}

function isRange(r, c) {
  if (r >= 0 && c >= 0 && r < N && c < N) return true;
  return false;
}

let count = 0;
let count_blind = 0;

// 적록색약이 아닌 경우 BFS 탐색
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (!visited[r][c]) {
      bfs(r, c, matrix[r][c]);
      count++;
    }
  }
}
// 방문기록 초기화
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    visited[r][c] = 0;
  }
}
// 적록색약인 경우 R -> G 로 변경
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (matrix[r][c] === 'R') matrix[r][c] = 'G';
  }
}
// 적록색약인 경우 BFS 탐색
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (!visited[r][c]) {
      bfs(r, c, matrix[r][c]);
      count_blind++;
    }
  }
}

console.log(count, count_blind);
