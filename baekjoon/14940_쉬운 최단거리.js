/* bfs 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number); // n:세로의 크기, m:가로의 크기
const maps = input.map((line) => line.split(' ').map(Number));
const distance = new Array(n).fill(0).map(() => new Array(m).fill(-1));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// 시작지점(2) 찾기
function findStart() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === 2) return [i, j];
    }
  }
}
// 범위 체크
function isRange(r, c) {
  if (r >= 0 && c >= 0 && r < n && c < m) return true;
  return false;
}
// bfs
function bfs(r, c) {
  const queue = [[r, c]];
  distance[r][c] = 0;
  while (queue.length) {
    const [row, col] = queue.shift();
    for (let [dr, dc] of direction) {
      const nr = dr + row;
      const nc = dc + col;
      // 범위 체크 & 갈 수 있는 땅 체크(1) && 방문한적 없는 땅인지 체크(-1)
      if (isRange(nr, nc) && maps[nr][nc] && distance[nr][nc] === -1) {
        distance[nr][nc] = distance[row][col] + 1;
        queue.push([nr, nc]);
      }
    }
  }
}

// 시작 지점이 2인 좌표에서 bfs 실행
const [r, c] = findStart();
bfs(r, c);

let answer = '';
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maps[i][j] == 0) answer += '0 ';
    else answer += distance[i][j] + ' ';
  }
  answer += '\n';
}

console.log(answer);
