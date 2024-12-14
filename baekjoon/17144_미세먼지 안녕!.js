const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
let [R, C, T] = input[0].split(' ').map(Number); // r:행, c:열, t:초
const board = input.slice(1).map((line) => line.split(' ').map(Number));

// 이미 확산된 칸에 더 확산될 수 있음 - 방문 기록 X
function spreadDust() {
  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];
  const next = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (board[r][c] > 0) {
        const dust = board[r][c];
        const nextDust = Math.floor(dust / 5);

        for (let i = 0; i < 4; i++) {
          const [nr, nc] = [r + dx[i], c + dy[i]];

          if (nr < 0 || nc < 0 || nr >= R || nc >= C || board[nr][nc] === -1) continue;
          board[r][c] -= nextDust;
          next.push([nr, nc, nextDust]);
        }
      }
    }
  }
  for (let [nr, nc, dust] of next) {
    board[nr][nc] += dust;
  }
}

// 공기청정기가 순환되는 방향의 반대 방향으로 순환하면서 한 칸씩 이동
function cleaner(top, bottom) {
  // top, bottom: 1열
  for (let row = top - 2; row >= 0; row--) {
    board[row + 1][0] = board[row][0];
  }
  for (let row = bottom + 2; row < R; row++) {
    board[row - 1][0] = board[row][0];
  }

  // top: 1행, bottom: 마지막행
  for (let col = 1; col < C; col++) {
    board[0][col - 1] = board[0][col];
    board[R - 1][col - 1] = board[R - 1][col];
  }

  // top, bottom: 마지막 열
  for (let row = 1; row <= top; row++) {
    board[row - 1][C - 1] = board[row][C - 1];
  }
  for (let row = R - 2; row >= bottom; row--) {
    board[row + 1][C - 1] = board[row][C - 1];
  }

  // top: top 행, bottom 행
  for (let col = C - 2; col > 0; col--) {
    board[top][col + 1] = board[top][col];
    board[bottom][col + 1] = board[bottom][col];
  }

  // 공기 청정기 우측 열
  board[top][1] = 0;
  board[bottom][1] = 0;
}

function countDust() {
  let count = 0;
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] > 0) {
        count += board[row][col];
      }
    }
  }
  return count;
}

function solution() {
  let cleanerUp = 0; // 위쪽 공기청정기가 위치한 행
  let cleanerDown = 0; // 아래쪽 공기청정기가 위치한 행
  for (let row = 0; row < R; row++) {
    if (board[row][0] === -1) {
      cleanerUp = row;
      cleanerDown = row + 1;
      break;
    }
  }

  // 주어진 시간만큼 미세먼지 확산, 공기청정기 실행
  while (T--) {
    spreadDust();
    cleaner(cleanerUp, cleanerDown);
  }

  const count = countDust();
  return count;
}

console.log(solution());
