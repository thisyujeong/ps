const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const field = input.map((row) => row.split('').map(Number));
const visited = Array.from({ length: n }, () => new Array(n).fill(0));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function bfs(x, y) {
  const queue = [[x, y]];
  let count = 1;
  visited[y][x] = 1;

  while (queue.length) {
    const [cx, cy] = queue.shift(); // current x, current y
    for (let [dx, dy] of direction) {
      const [nx, ny] = [cx + dx, cy + dy]; // next x, next y
      if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
        if (!visited[ny][nx] && field[ny][nx]) {
          queue.push([nx, ny]);
          visited[ny][nx] = 1;
          count++;
        }
      }
    }
  }

  return count;
}

let total = 0;
let counts = [];
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (!visited[y][x] && field[y][x]) {
      counts.push(bfs(x, y));
      total++;
    }
  }
}

counts.sort((a, b) => a - b);
console.log([total, ...counts].join('\n'));
