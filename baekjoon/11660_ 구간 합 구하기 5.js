const input = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));
const [n, m] = input.shift();
const table = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
const range = input.slice(n, n + m); // 합을 구해야하는 범위 케이스 m개 (x1, y1, x2, y2) x m
let answer = '';

// n x n 테이블 구성
// 문제에서 x는 행, y는 열
input.slice(0, n).forEach((r, x) => {
  r.forEach((cell, y) => (table[x + 1][y + 1] = cell));
});

// n x n 테이블 누적 합 채우기
for (let x = 1; x <= n; x++) {
  for (let y = 1; y <= n; y++) {
    table[x][y] += table[x][y - 1] + table[x - 1][y] - table[x - 1][y - 1];
  }
}
console.log(table);

// 범위 내 누적 합 구하기
for (let i = 0; i < m; i++) {
  const [x1, y1, x2, y2] = range[i];
  answer += table[x2][y2] - table[x1 - 1][y2] - table[x2][y1 - 1] + table[x1 - 1][y1 - 1];
  answer += '\n';
}

console.log(answer);
