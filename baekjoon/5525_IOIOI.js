/**
 * 서브태스크
 * 1. N ≤ 100, M ≤ 10 000. (50점)
 * 2. 추가적인 제약 조건이 없다. (50점)
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0]; // N+1개의 I, N개의 O, 1 ≤ N ≤ 1,000,000
const M = +input[1]; // 문자열 S의 길이, 2N+1 ≤ M ≤ 1,000,000
const S = input[2];

/**
 * 슬라이딩 윈두우? 브루트포스?
 * 문자열 길이가 N이고, 패턴의 길이가 M(3이상의 홀수)라고할때
 * 브루트 포스 방식으로 문자를 하나씩 순회할 때마다 일일히 패턴 길이를 순회해서 일치하는지 검사를 하게되면
 * O(N*M)의 시간이 걸리게 되므로 서브태스크 1번만 만족하게됨
 */
let p = ''; // 문자열 Pn 생성
for (let i = 0; i <= N * 2; i++) {
  p += i % 2 === 0 ? 'I' : 'O';
}
function solution1(p) {
  let left = 0;
  let right = p.length;
  let count = 0;
  while (right <= M) {
    if (S.slice(left++, right++) === p) count++;
  }
  return count;
}

console.log(solution1(p));

/**
 * KMP 알고리즘
 */
function solution() {}
