/* 
dfs - 완전 탐색 핵심인 문제. 
단순 DP로 풀 수 없음 -> 경로에 따라서 계산 결과가 달라지기 때문에 단순 DP로 누적해서는 풀 수 없다.
즉 모든 경로를 탐색해서 끝나는 지점에 도착했을 때 min, max를 비교하여 저장 

1. board[i][j] 다음 경로가 연산자인 경우
  현재 결과 그대로 전달하여 dfs 재귀
  
2. board[i][j] 다음 경로가 숫자인 경우 
  연산자를 활용하여 계산 후 dfs 재귀 (결과 값 전달)

3. 끝 지점에 도착하면 max, min 값을 비교하여 갱신 ==> 완전 탐색. 모든 경로를 무조건 탐색해야 함
*/
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0];
const matrix = input.slice(1).map((line) => line.split(' '));
const directions = [
  [1, 0],
  [0, 1],
];

let max = -Infinity;
let min = Infinity;

const isNumber = (val) => !isNaN(Number(val));
const calculate = (a, op, b) => {
  a = Number(a);
  b = Number(b);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
};

const dfs = (r, c, result, op) => {
  if (r === n - 1 && c === n - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
    return;
  }

  for (const [dr, dc] of directions) {
    const [nr, nc] = [r + dr, c + dc];

    if (nr >= n || nc >= n) continue; // 범위 체크

    const nextVal = matrix[nr][nc];

    if (isNumber(nextVal)) {
      dfs(nr, nc, calculate(result, op, nextVal), null);
    } else {
      // 연산자인 경우
      dfs(nr, nc, result, nextVal);
    }
  }
};

dfs(0, 0, Number(matrix[0][0]), null);

console.log(`${max} ${min}`);
