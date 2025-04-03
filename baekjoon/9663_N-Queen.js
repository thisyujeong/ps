/* TODO: 백트래킹 개념 숙지, 다시풀기 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
const queens = [];
let count = 0;

const isPossible = (row, col) => {
  for (const [r, c] of queens) {
    if (row === r || col === c) return false; // 같은 행, 열
    if (Math.abs(row - r) === Math.abs(col - c)) return false; // 대각선
  }
  return true;
};

const backtracking = (row) => {
  if (row === n) {
    count++;
    return;
  }

  for (let col = 0; col < n; col++) {
    if (!isPossible(row, col)) continue;
    queens.push([row, col]);
    backtracking(row + 1);
    queens.pop();
  }
};

backtracking(0);
console.log(count);
