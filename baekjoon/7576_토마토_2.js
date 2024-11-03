const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [M, N] = input.shift().split(' ').map(Number); // M: 상자 가로 칸의 수, N: 상자 세로 칸의 수
const tomatos = input.map((v) => v.split(' ').map(Number));
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 범위 체크 함수
function isRange(x, y) {
  if (x >= 0 && y >= 0 && x < M && y < N) return true;
  return false;
}

//// bfs
function bfs(queue) {
  let days = 0;
  // queue에는 익은 토마토만 존재
  while (queue.length) {
    const nextQueue = []; // 다음 방문할 칸 리스트
    console.log('queue', queue);
    for (let [row, col] of queue) {
      for (let [dx, dy] of direction) {
        const ny = row + dy;
        const nx = col + dx;
        // 범위 체크, 다음 토마토가 익지 않았다면
        if (isRange(nx, ny) && tomatos[ny][nx] === 0) {
          tomatos[ny][nx] = 1; // 익은 토마토로 변경
          nextQueue.push([ny, nx]);
        }
      }
    }

    if (nextQueue.length) days++;
    queue = nextQueue;
  }
  // 모든 토마토가 익었는지 확인
  isAllRipe = tomatos.every((row) => row.every((tomato) => tomato !== 0));
  return !isAllRipe ? -1 : days;
}

function solution() {
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 해당 칸이 익은 토마토라면 큐에 추가
      if (tomatos[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }
  console.log(bfs(queue));
}

solution();
