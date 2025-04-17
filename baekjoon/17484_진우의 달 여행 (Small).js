/**
 * 입력: 지구와 우주 사이 - N X M 행렬, 각 원소 값은 지나갈때 소모되는 연료의 양
 *    목표 -연료를 최대한 아끼며 달에 착륙할 것
 *
 *    1. 지구 -> 달로 가는 경우 우주선이 움질일 수 있는 방향
 *      대각선 좌측 아래, 아래로 직진, 대각선 우측 아래
 *    2. 우주선은 연속으로 같은 방향으로 움직일 수 없음.
 *
 * 로직: dfs
 *    이전 방향을 기억해야 하나? - yes
 *
 *    1. directions 배열: -1 좌측 대각선, 0 직진, 1, 우측 대각선
 *    2. 열 수만큼 dfs 수행. 구성: g
 *       -> y: 행, x: 열, prevDir: 이전방향, sum: 연료 누적 합
 *    3. dfs 반복 수행할 때마다, 다음 행의 세 방향으로 탐색
 *      -> 이전 방향과 같다면 패스
 *      -> 다르다면 sum + 연료
 *    4. 마지막 행에 도착했다면 sum 최솟값 비교/갱신
 *
 * 출력: 달에 도착하기 위해 필요한 연료의 최소값
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const matrix = input.map((line) => line.split(' ').map(Number));

const dx = [-1, 0, 1]; // -1: 왼쪽 대각선, 0: 직진, 1: 오른쪽 대각선
let min = Infinity;

function dfs(y, x, prevDir, sum) {
  // 달에 도착(마지막 행까지 도달), 최솟값 비교/갱신
  if (y === n - 1) {
    min = Math.min(min, sum);
    return;
  }

  // 세 방향 탐색
  for (let d = 0; d < 3; d++) {
    // 이전 방향과 같다면 패스
    if (d === prevDir) continue;

    const nx = x + dx[d];
    const ny = y + 1;

    if (nx >= 0 && nx < m) {
      dfs(ny, nx, d, sum + matrix[ny][nx]);
    }
  }
}

// 지구에서 출발 (첫 행의 모든 칸에서 시작)
for (let x = 0; x < m; x++) {
  dfs(0, x, -1, matrix[0][x]);
}
console.log(min);
