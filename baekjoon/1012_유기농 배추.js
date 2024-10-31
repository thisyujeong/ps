const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const arr = input.map((v) => v.split(' ').map(Number));

// 상하좌우 좌표
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < T; i++) {
  const [m, n, k] = arr.shift(); // M:가로길이, N:세로길이, K:배추개수
  const coord = arr.splice(0, k); // 좌표 정보

  // 필드 생성 및 구성
  // 좌표 방문 시 -1 처리
  const field = Array.from({ length: n }, () => new Array(m).fill(0));
  for (let [x, y] of coord) {
    field[y][x] = 1;
  }

  // bfs - queue
  function bfs(start, field) {
    const [x, y] = start;
    const queue = [[x, y]];
    field[y][x] = -1;

    while (queue.length) {
      const [x, y] = queue.shift();
      for (let [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        // 상하좌우 방문 시도
        if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
          // 다음 좌표 미방문시
          if (field[ny][nx] > 0) {
            queue.push([nx, ny]);
            field[ny][nx] = -1; // 다음 좌표 방문 처리
          }
        }
      }
    }
  }

  // dfs - 재귀함수
  function dfs(x, y, field) {
    field[y][x] = -1;
    for (let [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
        if (field[ny][nx] > 0) {
          field[ny][nx] = -1;
          dfs(nx, ny, field);
        }
      }
    }
  }

  let count = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      // 배추가 심어진 땅 방문
      if (field[y][x] > 0) {
        bfs([x, y], field);
        // dfs(x, y, field);
        count++;
      }
    }
  }
  console.log(count);
}
