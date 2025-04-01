// 백트래킹, 완전탐색
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [n, m] = input.map(Number);

const visited = new Array(n + 1).fill(false);
const sequence = new Array(m);

const backtracing = (k) => {
  if (k === m) {
    console.log(sequence.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      sequence[k] = i;
      visited[i] = true;
      backtracing(k + 1);
      visited[i] = false;
    }
  }
};

backtracing(0);
