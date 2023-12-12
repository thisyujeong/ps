const file = require('fs').readFileSync('./input.txt').toString().trim();
const input = file.split('\n').map((v) => v.split(' ').map(Number));
let graph, w, h;

// 상하좌우 & 대각선을 탐색하기 위한 좌표
const ds = [
  [-1, 0],
  [-1, 1],
  [-1, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [0, 1],
];

function islandCount() {
  let count = 0; // 테스트 케이스 별 섬 개수

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (graph[y][x] === 1) {
        bfs(y, x);

        // dfs 또는 bfs 함수를 빠져나왔다면
        // 섬 하나를 모두 탐색한 것이므로 섬 개수 카운트
        count++;
      }
    }
  }

  console.log(count);
}

// 1. dfs
function dfs(y, x) {
  if (rangeCheck(y, x) && graph[y][x]) {
    graph[y][x] = 0;

    for (let i = 0; i < ds.length; i++) {
      const nx = x + ds[i][0];
      const ny = y + ds[i][1];
      dfs(ny, nx);
    }
  }
}

// 2. bfs
function bfs(y, x) {
  const queue = [[x, y]];
  graph[y][x] = 0;

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < ds.length; i++) {
      const nx = cx + ds[i][0];
      const ny = cy + ds[i][1];
      if (rangeCheck(ny, nx) && graph[ny][nx]) {
        queue.push([nx, ny]);
        graph[ny][nx] = 0;
      }
    }
  }
}

// 좌표 범위 체크
function rangeCheck(y, x) {
  if (x >= 0 && x < w && y >= 0 && y < h) return true;
  return false;
}

// 테스트 케이스 slice 하여 탐색
for (let tc = 0; tc < input.length - 1; tc++) {
  [w, h] = input[tc];
  graph = input.slice(tc + 1, tc + h + 1);
  tc += h;

  islandCount();
}
