/* 
  입력: 지구와 우주 사이는 N x M 행렬로 나타냄. 각 원소의 값은 우주선이 지날 때 소모되는 연료의 양
  로직: DP 문제?
  출력: 달 여행에 필요한 최소 연료의 값 = 최소 경로
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const matrix = input.map((line) => line.split(' ').map(Number));

// dp[y][x][dir] = y행 x열에 dir 방향으로 도착했을 때 최소 연료
const dp = Array.from({ length: n }, () => Array.from({ length: m }, () => new Array(3).fill(Infinity)));

const dx = [-1, 0, 1]; // 왼아래, 아래, 오른아래 방향

for (let x = 0; x < m; x++) {
  for (let d = 0; d < 3; d++) {
    dp[0][x][d] = matrix[0][x];
  }
}

for (let y = 1; y < n; y++) {
  for (let x = 0; x < m; x++) {
    for (let dir = 0; dir < 3; dir++) {
      const prevX = x - dx[dir]; // 어느 방향에서 왓는지, 이전 x 좌표 계산
      if (prevX < 0 || prevX >= m) continue; // 가장 좌,우측은 x 좌표 범위를 벗어날 가능성이 있음

      // 세가지 방향 탐색
      for (let prevDir = 0; prevDir < 3; prevDir++) {
        if (dir === prevDir) continue; // 같은 방향 연속이면 패스
        dp[y][x][dir] = Math.min(dp[y][x][dir], dp[y - 1][prevX][prevDir] + matrix[y][x]);
      }
    }
  }
}

let result = Infinity;
for (let x = 0; x < m; x++) {
  for (let d = 0; d < 3; d++) {
    result = Math.min(result, dp[n - 1][x][d]);
  }
}
console.log(result);
