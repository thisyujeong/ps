/* DP 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const board = input.map((l) => l.split(' ').map(Number));

// 각 좌표에 [가로, 세로, 대각선] 의 경우의 수 저장
const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => [0, 0, 0]));

// 벽을 만나기 전까지 첫번째 행의 가로방향을 1로 초기화
for (let c = 1; c < N; c++) {
  if (board[0][c] === 1) break; // 벽을 만난 경우 중단
  dp[0][c][0] = 1;
}

for (let r = 1; r < N; r++) {
  for (let c = 1; c < N; c++) {
    if (board[r][c] === 1) continue; // 벽을 만난 경우

    // 가로 방향에서 오는것 = 왼쪽의 왼쪽 방향에서 온 경우의 수 + 왼쪽의 대각선 방향에서 온 경우의 수
    dp[r][c][0] = dp[r][c - 1][0] + dp[r][c - 1][2];
    // 세로 방향에서 오는 것 = 위의 위 방향에서 온 경우의 수 + 위의 대각선 방향에서 온 경우의 수
    dp[r][c][1] = dp[r - 1][c][1] + dp[r - 1][c][2];

    // 파이프가 벽을 긁으면 안 된다. 즉, 대각선 방향으로 이동시 벽을 긁게되므로 위칸, 왼칸은 무조건 벽이면 안됨
    if (board[r - 1][c] === 0 && board[r][c - 1] === 0) {
      // 대각선 방향에서 오는 것 = 대각선의 왼쪽방향 + 대각선의 오른쪽 방향 + 대각선의 대각선 방향에서 온 경우의 수
      dp[r][c][2] = dp[r - 1][c - 1][0] + dp[r - 1][c - 1][1] + dp[r - 1][c - 1][2];
    }
  }
}

const result = dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2];
console.log(result);
