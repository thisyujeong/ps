/**
 * Brute Force 완전탐색 문제 - node.js 로는 메모리 초과로 풀 수 없는 문제인듯 하다.
 *
 * 1 <= E <= 15
 * 1 <= S <= 28
 * 1 <= M <= 19
 *
 * 1. 각각의 최대 범위를 e = 15, s = 28, m = 19라고 가정
 * 2. 연도를 x, 입력이 1, 2, 3 이라고 가정
 *
 * x를 각각의 e, s, m으로 나눈 나머지 값이 1, 2, 3이 된다고 볼 수 있음
 *  x % e = 1
 *  x % s = 2
 *  x % m = 3
 *
 * 위 식을 방향을 바꿔 생각해보자.
 * x에서 나머지 값을 빼고 각각의 e, s, m 으로 나누면 나머지가 0이 된다.
 *  (x - 1) % e = 0
 *  (x - 2) % s = 0
 *  (x - 3) % m = 0
 *
 * 따라서 x의 값을 1씩 증가시키면서 위 식에 대입해볼 수 있고,
 * E, S, M 모두 나머지가 0이 나오는 X값을 구하면 된다.

 */
const input = require('fs').readFileSync('./input.txt').toString().trim();
const [e, s, m] = input.split(' ').map(Number);
let year = 1;

while (1) {
  if ((year - e) % 15 === 0 && (year - s) % 28 === 0 && (year - m) % 19 === 0) {
    console.log(year);
    return;
  }
  year++;
}
