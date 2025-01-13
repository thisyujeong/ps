// 100 x 100 이하의 맵
// bfs 실행: 시작점 -> 레버, 레버 -> 탈출
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(maps) {
  const map = maps.map((row) => row.split(''));
  const h = map.length; // 행
  const w = map[0].length; // 열

  let lever;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (map[r][c] === 'S') {
        lever = bfs(r, c, 'L');
        if (!lever) return -1;
        break;
      }
    }
  }

  const goal = bfs(lever[0], lever[1], 'E');

  if (!goal) return -1;
  return lever[2] + goal[2];

  // bfs
  function bfs(r, c, goal) {
    const visited = Array.from({ length: h }, () => Array(w).fill(0));
    const queue = [[r, c]];
    let head = 0;

    visited[r][c] = 1;

    while (head < queue.length) {
      const [cr, cc] = queue[head++];

      if (maps[cr][cc] === goal) {
        return [cr, cc, visited[cr][cc] - 1]; // [r, c, time]
      }

      for (const [dr, dc] of direction) {
        const [nr, nc] = [cr + dr, cc + dc];

        if (nr < 0 || nc < 0 || nr >= h || nc >= w) continue;
        if (maps[nr][nc] !== 'X' && !visited[nr][nc]) {
          queue.push([nr, nc]);
          visited[nr][nc] = visited[cr][cc] + 1;
        }
      }
    }

    return null;
  }
}
