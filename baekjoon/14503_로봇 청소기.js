// 250327, 1day, 시간 내에 풀지 못함

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const [sr, sc, sd] = input.shift().split(' ').map(Number); // 시작 좌표(sr, sc) 시작 방향(d)
const room = input.map((r) => r.split(' ').map(Number)); // 0: 빈칸(청소대상), 1: 벽
const isCleanUp = Array.from({ length: n }, () => new Array(m).fill(0)); // 0: 청소X, 1: 청소O
const direction = [
  [-1, 0], // 북
  [0, 1], // 동
  [1, 0], // 남
  [0, -1], // 서
];

let count = 0;

// 범위, 빈칸 여부 체크
const isValid = (r, c) => {
  if (r < 0 || r >= n || c < 0 || c >= m || room[r][c]) return false;
  return true;
};

const turnLeft = (dir) => (dir + 3) % 4; // 반시계방향으로 회전
const backward = (dir) => direction[(dir + 2) % 4]; // 후진

// 방향 d (0: 북쪽, 1: 동쪽, 2: 남쪽, 3:서쪽)

const dfs = (r, c, d) => {
  // 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
  if (!isCleanUp[r][c]) {
    isCleanUp[r][c] = 1;
    count++;
  }

  // 주변 칸 4중 중 청소되지 않은 빈칸이 있는지 체크
  let hasAroundQueue = false;

  for (let [dr, dc] of direction) {
    const [nr, nc] = [r + dr, c + dc];
    if (isValid(nr, nc) && !isCleanUp[nr][nc]) {
      hasAroundQueue = true;
      break;
    }
  }
  if (!hasAroundQueue) {
    /* 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우,
      1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
      2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다. */
    const back = backward(d);
    const [nr, nc] = [r + back[0], c + back[1]];

    if (isValid(nr, nc)) dfs(nr, nc, d);
  }

  if (hasAroundQueue) {
    /*  현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
      1. 반시계방향 90도 회전
      2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
      3. dfs 반복 */
    const left = turnLeft(d);
    const leftForward = direction[left];
    const [nr, nc] = [r + leftForward[0], c + leftForward[1]];

    if (isValid(nr, nc) && !isCleanUp[nr][nc]) dfs(nr, nc, left);
    else dfs(r, c, left);
  }
};

dfs(sr, sc, sd);
console.log(count);
