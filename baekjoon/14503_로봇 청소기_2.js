/* 250439 2day 55m */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number); // n x m
const [sr, sc, sd] = input.shift().split(' ').map(Number); // start r, start c, start direction
const map = input.map((line) => line.split(' ').map(Number)); // 0: 빈칸, 1: 벽
const isClean = Array.from({ length: n }, () => new Array(m).fill(false)); // true: 청소된 칸, false: 청소 안된 칸

let count = 0;

// 반시계방향 90도 회전: 북 > 서 > 남 > 동
// 0: 북쪽 (top), 1: 동쪽 (right), 2: 남쪽 (down), 3: 서쪽 (left)
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// DFS
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= m || map[r][c]) return false;
  return true;
};

const backward = (d) => (d + 2) % 4; // 후진
const turnLeft = (d) => (d + 3) % 4; // 반시계방향 90도 회전

const cleanUp = (r, c, d) => {
  // 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
  if (!isClean[r][c]) {
    isClean[r][c] = true;
    count += 1;
  }

  let hasAroundQueue = false;
  for (let [dr, dc] of direction) {
    const [nr, nc] = [r + dr, c + dc];
    if (isValid(nr, nc) && !isClean[nr][nc]) {
      hasAroundQueue = true;
      break;
    }
  }

  // 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
  if (!hasAroundQueue) {
    const [dr, dc] = direction[backward(d)];
    const [nr, nc] = [r + dr, c + dc];

    if (isValid(nr, nc)) cleanUp(nr, nc, d);
  }

  // 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
  if (hasAroundQueue) {
    const left = turnLeft(d);
    const [dr, dc] = direction[left];
    const [nr, nc] = [r + dr, c + dc];

    if (isValid(nr, nc) && !isClean[nr][nc]) cleanUp(nr, nc, left);
    else cleanUp(r, c, left);
  }
};

cleanUp(sr, sc, sd);

console.log(count);
