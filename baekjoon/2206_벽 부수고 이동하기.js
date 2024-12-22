/* TODO: 다시 풀어보기, 개선 필요 */
class Node {
  constructor(x, y, cnt, isBreak) {
    this.x = x;
    this.y = y;
    this.cnt = cnt;
    this.isBreak = isBreak;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  get size() {
    return this.length;
  }
  enqueue(x, y, cnt, isBreak) {
    const node = new Node(x, y, cnt, isBreak);
    if (this.length === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  }
  dequeue() {
    const first = this.head;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return first;
  }
}

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const map = input.map((line) => line.split('').map(Number));
const directions = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
let answer = -1;

function bfs() {
  // visited[x][y][0/1] - 0: 벽을 부수지 않음, 1: 벽을 부숨
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array.from({ length: 2 }, () => 0))
  );
  const q = new Queue();
  q.enqueue(0, 0, 1, 0); // x, y, cnt, isBreak

  while (q.size) {
    const { x, y, cnt, isBreak } = q.dequeue();

    // 현재 좌표가 도착지점인 경우 중단
    if (x === M - 1 && y === N - 1) {
      answer = cnt;
      break;
    }

    // 방문한적 있는지 확인
    if (visited[y][x][isBreak]) continue;
    else visited[y][x][isBreak] = 1;

    // 상하좌우 이동
    for (const [dx, dy] of directions) {
      let [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;

      // 해당 좌표가 벽인지 아닌지 확인
      let nextIsBreak = isBreak;
      // 다음 좌표가 벽이고 - 벽을 부순적 없다면 벽울 부수고, 부순적 있다면 다시 되돌아감
      if (map[ny][nx]) {
        if (!nextIsBreak) nextIsBreak = 1;
        else continue;
      }
      q.enqueue(nx, ny, cnt + 1, nextIsBreak);
    }
  }
}

bfs();

console.log(answer);

/* 
// 메모리 초과
let visited = Array.from({ length: N }, () => Array(M).fill(0));
function bfs() {
  const queue = [[0, 0, 1]];
  let head = 0;
  visited = visited.map((row) => row.fill(0));
  visited[0][0] = 1;

  while (head < queue.length) {
    const [x, y, cnt] = queue[head++];
    if (x === M && y === N) break;
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (map[ny][nx] === 0 && visited[ny][nx] === 0) {
        queue.push([nx, ny, cnt + 1]);
        visited[ny][nx] = cnt + 1;
      }
    }
  }
  return visited[N - 1][M - 1];
}

let answer = Infinity;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (map[y][x] === 1) {
      map[y][x] = 0;
      const count = bfs();
      if (count > 0) answer = answer > count ? count : answer;
      map[y][x] = 1;
    }
  }
}

console.log(answer === Infinity ? -1 : answer);
 */
