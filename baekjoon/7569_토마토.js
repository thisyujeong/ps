const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [M, N, H] = input.shift().split(' ').map(Number); // M:가로, N:세로, H:높이

// 인접 칸 [row, col, height]
const direction = [
  [0, 0, 1],
  [0, 0, -1],
  [-1, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
];
// 박스 구성
const boxes = [];
for (let i = 0; i < input.length; i += N) {
  const box = input.slice(i, i + N).map((line) => line.split(' ').map(Number));
  boxes.push(box);
}

// 범위 체크
function isRange(r, c, h) {
  if (r >= 0 && c >= 0 && h >= 0 && r < N && c < M && h < H) return true;
  return false;
}

////// 풀이 1
function solution1() {
  let queue = [];
  for (let h = 0; h < H; h++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (boxes[h][r][c] === 1) {
          queue.push([r, c, h]);
        }
      }
    }
  }

  let days = 0;
  while (queue.length) {
    const nextQueue = [];
    for (const [r, c, h] of queue) {
      for (const [dr, dc, dh] of direction) {
        const [nr, nc, nh] = [r + dr, c + dc, h + dh];
        if (isRange(nr, nc, nh) && boxes[nh][nr][nc] === 0) {
          nextQueue.push([nr, nc, nh]);
          boxes[nh][nr][nc] = 1;
        }
      }
    }

    if (nextQueue.length > 0) days++;
    queue = nextQueue;
  }

  const isAllRipen = boxes.every((box) =>
    box.every((row) => row.every((col) => col !== 0))
  );
  console.log(isAllRipen ? days : -1);
}

solution1();

////// 풀이 2 - 초기 익지 않은 토마토 개수에서 하나씩 차감
function solution2() {
  const queue = [];
  let unripeCount = 0;
  for (let h = 0; h < H; h++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (boxes[h][r][c] === 0) unripeCount++;
        if (boxes[h][r][c] === 1) queue.push([r, c, h, 0]); // [row, col, height, days]
      }
    }
  }

  let answer = 0;
  let head = 0;
  while (queue.length > head) {
    const [r, c, h, days] = queue[head++];
    for (const [dr, dc, dh] of direction) {
      const [nr, nc, nh] = [r + dr, c + dc, h + dh];
      if (isRange(nr, nc, nh) && boxes[nh][nr][nc] === 0) {
        boxes[nh][nr][nc] = 1; // 토마토 익힘
        queue.push([nr, nc, nh, days + 1]); // 다음 칸 방문 예약
        unripeCount--; // 익지 않은 토마토 개수 차감
      }
    }
    answer = days;
  }
  console.log(unripeCount ? -1 : answer);
}

// solution2();
