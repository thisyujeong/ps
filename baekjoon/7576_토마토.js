/**
 * 이 문제는 2차원 그래프의 최소 거리를 구하는 문제와 같다.
 * 즉, dfs보다 bfs를 사용하는 것이 적합하다.
 *
 * queue를 shift하는 방식을 사용할 경우 시간초과가 발생한다.
 * 배열 shift는 O(n)을 시간복잡도를 차지하기 때문에 각 좌표를 모두 탐색하기에는 부하가 큼
 * 배열의 head만 한 단계씩 더하는 방식으로 구현해야 함
 *
 * 다른 사람의 풀이를 참고함
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [m, n] = input.shift().split(' ').map(Number); // m 가로 칸의 수(x), n 세로 칸의 수(y)
const board = input.map((line) => line.split(' ').map(Number));

// 상하좌우 탐색을 위한 좌표
const ds = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution() {
  // 익은 토마토의 좌표를 저장할 큐를 빈 배열로 초기화, 익은 토마토만 queue에 들어감.
  const queue = [];
  // board 크기만큼의 2차원배열. 원소를 0으로 초기화하고, 익지 않은 토마토는 -1으로 재할당할 것
  const dist = Array.from(Array(n), () => new Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 익은 토마토를 탐색하여 queue에 추가
      if (board[i][j] === 1) {
        queue.push([j, i]);
      }
      // 익지 않은 토마토일 경우 dist 배열에 해당 좌표를 -1로 재할당
      // 이미 익은 토마토이거나 빈칸인 경우 확인할 필요가 없음
      if (board[i][j] === 0) {
        dist[i][j] = -1;
      }
    }
  }

  let head = 0;
  // head가 queue의 길이보다 작을 경우만 실행
  while (queue.length > head) {
    const [x, y] = queue[head++];
    for (let k = 0; k < ds.length; k++) {
      const nx = x + ds[k][0];
      const ny = y + ds[k][1];

      // 가로 세로 범위를 벗어날 경우 또는
      // 익은 토마토이거나, 토마토가 없는 빈칸일 경우 넘어가기
      if (!rangeCheck(nx, ny) || dist[ny][nx] >= 0) continue;

      // 익은 토마토로 인해 안익은 다음 토마토가 익을 때마다 해당 좌표에 1씩 증가시켜줌
      // 최종적으로 dist의 각 좌표에서 가장 높은 수를 갖고 있는 좌표가
      // 토마토를 모두 익힐 때까지의 최소 날짜가 됨
      dist[ny][nx] = dist[y][x] + 1;
      queue.push([nx, ny]);
    }
  }

  let day = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 익지 않은 토마토가 있을 경우 -1 반환
      if (dist[i][j] === -1) return -1;
      // 토마토를 모두 일힐 때까지의 최소 날짜
      day = Math.max(day, dist[i][j]);
    }
  }
  return day;
}

// 범위 체크
function rangeCheck(x, y) {
  if (x >= 0 && x < m && y >= 0 && y < n) return true;
  return false;
}

console.log(solution());
