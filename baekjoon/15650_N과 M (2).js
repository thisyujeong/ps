/* TODO: 백트래킹 복습하기 */
const input = require('fs').readFileSync('./input.txt').toString().trim();
const [n, m] = input.split(' ').map(Number);

/* 풀이 1 */
function backtracking(start, curr) {
  if (curr.length === m) {
    console.log(curr.join(' '));
    return;
  }

  for (let i = start; i <= n; i++) {
    curr.push(i);
    backtracking(i + 1, curr);
    curr.pop();
  }
}

backtracking(1, []);

/* 풀이 2 */
let result = [];
function backtracking(start, index) {
  if (index === m) {
    console.log(result.join(' '));
    return;
  }

  for (let i = start; i <= n; i++) {
    result[index] = i;
    backtracking(i + 1, index + 1);
  }
}

backtracking(1, 0);
