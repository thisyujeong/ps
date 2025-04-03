/**
 * 250403 시간 내에 풀지 못함(1h 45m)
 * 문제 유형 파악은 맞았으나, 풀이 접근 방법에서 헷갈림
 *
 * 잠긴 영역, 안전하지 않은 영역 탐색하는 것이 아니라 안전한 영역을 중점으로 찾아봐야 한다.
 * 즉 높이 1부터 오름차순으로 탐색하지 않고, 주어진 영역들 중 가장 높은 수를 갖는 영역 높이부터 시작해 내림차순으로 bfs 탐색을 수행한다
 *
 * 높이 1부터 오름차순으로 탐색한다면 점점 안전한 영역이 축소되지만
 * 내림차순으로 탐색하면 안전한 영역이 점차 확장되므로 bfs 탐색을 통한 풀이 방법으로 더 적합하다
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

const solution = (input) => {
  let max = 0;
  let answer = 0;
  const n = +input.shift();
  const safeMap = Array.from({ length: n }, () => new Array(n).fill(0)); // 1: safe, 0: unsafe
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const map = input.map((line) =>
    line.split(' ').map((h) => {
      max = Math.max(max, h);
      return +h;
    })
  );

  // 모든 영역의 높이가 같다면 "아무 지역도 물에 잠기지 않을 수도 있다"
  const isEverySame = map.every((line) => line.every((v) => v == map[0][0]));
  if (isEverySame) {
    console.log(1);
    return;
  }

  const bfs = (row, col, height, visited) => {
    const queue = [[row, col]];
    let head = 0;

    visited[row][col] = 1;
    safeMap[row][col] = 1;

    while (head < queue.length) {
      const [r, c] = queue[head++];

      for (let [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];

        if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
        if (!visited[nr][nc] && map[nr][nc] > height) {
          safeMap[nr][nc] = 1;
          visited[nr][nc] = 1;
          queue.push([nr, nc]);
        }
      }
    }
  };

  for (let h = max; h > 0; h--) {
    const visited = Array.from({ length: n }, () => new Array(n).fill(0));
    let count = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!visited[r][c] && map[r][c] > h) {
          bfs(r, c, h, visited);
          count++;
        }
      }
    }
    answer = Math.max(answer, count);
  }

  console.log(answer);
};

solution(input);
