/** 분할정복 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number); // N: A 배열 크기, M: B 배열 크기
const A = input[1].split(' ').map(Number);
const B = input[2].split(' ').map(Number);

const merged = new Array(N + M);
let ai = 0; // A index
let bi = 0; // B index

for (let i = 0; i < N + M; i++) {
  if (ai === N) merged[i] = B[bi++];
  else if (bi === M) merged[i] = A[ai++];
  else if (A[ai] <= B[bi]) merged[i] = A[ai++];
  else merged[i] = B[bi++];
}

console.log(merged.join(' '));
