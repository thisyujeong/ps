/* BFS 문제 */
const input = require('fs').readFileSync('./input.txt').toString().split('\n');
const [N, M] = input.shift(); // N:게임판에 있는 사다리 수, M:뱀의 수
const special = input.map((v) => v.split(' ').map(Number)); // 특수 칸(사다리, 뱀)
const board = Array.from({ length: 101 }, (_, i) => i);

special.forEach(([from, to]) => (board[from] = to));

function bfs(start) {
  const visited = new Array(101).fill(0);
  const queue = [[start, 0]]; // 정점, 횟수
  let head = 0;
  visited[start] = 1;
  while (head < queue.length) {
    const [cur, cnt] = queue[head++];
    if (cur === 100) return cnt;
    for (let dice = 1; dice <= 6; dice++) {
      let next = cur + dice;
      if (next === 100) return cnt + 1;
      if (next < 100) {
        if (board[next] > 0) {
          next = board[next];
        }
        if (!visited[next]) {
          queue.push([next, cnt + 1]);
          visited[next] = 1;
        }
      }
    }
  }
}

console.log(bfs(1));
