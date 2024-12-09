/**
 * TODO: 실행시간 개선
 * 최대 64개의 공간, 바이러스 최소 2개
 * 빈 공간은 최대 62개
 *
 * 62 C 3 -> 62개중 3개를 뽑는 '조합'의 문제 -> 백트래킹
 * : 62 x 61 x 60 복잡도의 문제
 * : 대략 2^6 x 2^6 x 2^6 = 2^18
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number); // n: 세로, m: 가로 (3 <= n, m <= 8)
const map = input.map((l) => l.split(' ').map(Number));
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let answer = 0;
function bfs() {
  const queue = [];
  const temp = map.map((line) => [...line]); // copy

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (temp[y][x] === 2) queue.push([x, y]); // 바이러스
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
        if (temp[ny][nx] === 0) {
          temp[ny][nx] = 2;
          queue.push([nx, ny]);
        }
      }
    }
  }

  let count = 0; // 감염되지 않은 연구소 개수(빈칸)
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (temp[y][x] === 0) count++;
    }
  }
  answer = Math.max(answer, count);
}

// 백트래킹
function setWall(count) {
  if (count === 3) {
    bfs();
    return;
  }

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      // 빈공간이라면 벽 세우기 가능
      if (map[y][x] === 0) {
        map[y][x] = 1;
        setWall(count + 1);
        map[y][x] = 0;
      }
    }
  }
}

setWall(0);

console.log(answer);
