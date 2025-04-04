// dfs
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const graph = input.map((line) => line.split(' ').map(Number));

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

function dfs(r, c, rain, visited) {
  visited[r][c] = 1;
  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i];
    const nc = c + dc[i];

    if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
    if (!visited[nr][nc] && graph[nr][nc] > rain) {
      dfs(nr, nc, rain, visited);
    }
  }
}

let maxHeight = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    maxHeight = Math.max(maxHeight, graph[i][j]);
  }
}

let maxSafeArea = 0;
for (let rain = 0; rain <= maxHeight; rain++) {
  const visited = Array.from({ length: N }, () => Array(N).fill(0));
  let safeCount = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && graph[i][j] > rain) {
        dfs(i, j, rain, visited);
        safeCount++;
      }
    }
  }
  console.log(rain, visited, safeCount);
  maxSafeArea = Math.max(maxSafeArea, safeCount);
}

console.log(maxSafeArea);
