const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

// 가로, 세로, 대각선 이동
const dr = [0, 0, -1, 1, -1, -1, 1, 1];
const dc = [-1, 1, 0, 0, -1, 1, -1, 1];

let w, h;

const bfs = (row, col, visited, islands) => {
  const queue = [[row, col]];
  let head = 0;

  visited[row][col] = true;

  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      // 좌표 범위 체크
      if (nr < 0 || nc < 0 || nr >= h || nc >= w) continue;

      // 방문하지 않았고 땅인경우
      if (!visited[nr][nc] && islands[nr][nc]) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
      }
    }
  }
};

// 주어진 테스트케이스만큼 반복수행
for (let i = 0; i < input.length - 1; i++) {
  [w, h] = input[i].split(' ').map(Number); // w: 가로, h: 세로
  const islands = input.slice(i + 1, i + h + 1).map((line) => line.split(' ').map(Number)); // 1: 땅, 0: 바다
  const visited = Array.from({ length: h }, () => Array(w).fill(false));

  let count = 0;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      // 방문하지 않았고 땅인경우 bfs 수행
      if (!visited[r][c] && islands[r][c]) {
        bfs(r, c, visited, islands);
        count++;
      }
    }
  }

  console.log(count);

  i += h; // 다음 테스트케이스
}
