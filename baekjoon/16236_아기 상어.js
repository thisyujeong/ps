// BFS 문제
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const grid = input.map((line) => line.split(' ').map(Number));

// 상하좌우 방향
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let sharkSize = 2; // 아기상어 크기
let sharkEatCnt = 0; // 아기상어가 먹은 물고기 수
let sharkRow, sharkCol; // 아기상어 위치
let time = 0; // 시간

/* 아기상어 초기 위치 찾기 */
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (grid[i][j] === 9) {
      sharkRow = i;
      sharkCol = j;
      break;
    }
  }
}

/* 먹을 수 있는 물고기 탐색 */
function findFish(r, c) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = [{ y: r, x: c, dist: 0 }]; // row, col, dist
  let eatableFish = [];
  let head = 0;

  visited[r][c] = true;

  while (head < queue.length) {
    const { x, y, dist } = queue[head++];

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];

      // 범위, 방문여부 체크
      if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[ny][nx]) continue;

      // 상어의 크기보다 작거나 같을 경우 (지나갈 수 있는 경우)
      if (grid[ny][nx] <= sharkSize) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny, dist: dist + 1 });

        // 먹을 수 있는 경우 목록에 추가
        if (grid[ny][nx] > 0 && grid[ny][nx] < sharkSize) {
          eatableFish.push({ x: nx, y: ny, dist: dist + 1 });
        }
      }
    }
  }
  return eatableFish;
}

/* 먹을 수 있는 물고기를 먹고, 이동한 시간을 계산 */
function eatFish(fish) {
  // 아기상어가 있던 위치를 빈 공간으로 변경, 아기상어 위치 이동
  grid[sharkRow][sharkCol] = 0;
  sharkRow = fish.y;
  sharkCol = fish.x;
  grid[sharkRow][sharkCol] = 9;

  time += fish.dist; // 이동거리만큼 이동 시간 추가
  sharkEatCnt++; // 물고기 먹은 횟수 증가

  // 아기상어가 크기와 먹은 물고기 수가 같다면 아기상어 크기 증가
  if (sharkEatCnt === sharkSize) {
    sharkSize++;
    sharkEatCnt = 0;
  }
}

function solution() {
  while (true) {
    // 먹을 수 있는 물고기 찾기
    const eatableFish = findFish(sharkRow, sharkCol);

    // 먹을 수 있는 물고기가 없다면 종료
    if (eatableFish.length === 0) break;

    /* 가장 가까운 물고기를 먹기위해 정렬 */
    eatableFish.sort((a, b) => {
      // 가장 가까운 물고기가 많다면, 가장 위에 있는 물고기를 먹고
      // 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다
      if (a.dist === b.dist) {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
      }
      return a.dist - b.dist;
    });

    // 가장 가까운 물고기 먹기
    eatFish(eatableFish[0]);
  }

  return time;
}

console.log(solution());
