const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // 1 <= N, M <= 600
const campus = input.map((v) => v.split(''));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/////////////////////////////// dfs 성공 ///////////////////////////////
let count = 0;
function dfs(x, y) {
  for (let [dx, dy] of direction) {
    const nextX = x + dx;
    const nextY = y + dy;
    if (nextX >= 0 && nextY >= 0 && nextX < M && nextY < N) {
      if (campus[nextY][nextX] === 'P') count++;
      if (campus[nextY][nextX] !== 'X') {
        campus[nextY][nextX] = 'X';
        dfs(nextX, nextY);
      }
    }
  }
}
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (campus[i][j] === 'I') {
      dfs(j, i);
      break;
    }
  }
}
console.log(count ? count : 'TT');

/////////////////////////////// bfs 시간초과 ///////////////////////////////
function bfs(x, y) {
  const queue = [[x, y]];
  let count = 0;
  campus[y][x] = 'X';

  while (queue.length) {
    const [curX, curY] = queue.shift();
    for (let [dx, dy] of direction) {
      const nextX = curX + dx;
      const nextY = curY + dy;
      if (nextX >= 0 && nextY >= 0 && nextX < M && nextY < N) {
        if (campus[nextY][nextX] === 'P') count++;
        if (campus[nextY][nextX] !== 'X') {
          queue.push([nextX, nextY]);
          campus[nextY][nextX] = 'X';
        }
      }
    }
  }
  return count ? count : 'TT';
}

/////////////////////////////// bfs 성공 (Queue 구현) ///////////////////////////////
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  size() {
    return this.length;
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }
  dequeue() {
    const first = this.head.value;
    this.head = this.head.next;
    this.length--;
    return first;
  }
}

function bfs(x, y) {
  const queue = new Queue();
  let count = 0;

  queue.enqueue([x, y]);
  campus[y][x] = 'X';

  while (queue.size() > 0) {
    const [curX, curY] = queue.dequeue();
    for (let [dx, dy] of direction) {
      const nextX = curX + dx;
      const nextY = curY + dy;
      if (nextX >= 0 && nextY >= 0 && nextX < M && nextY < N) {
        if (campus[nextY][nextX] === 'P') count++;
        if (campus[nextY][nextX] !== 'X') {
          queue.enqueue([nextX, nextY]);
          campus[nextY][nextX] = 'X';
        }
      }
    }
  }

  return count ? count : 'TT';
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (campus[i][j] === 'I') {
      console.log(bfs(j, i));
      break;
    }
  }
}
