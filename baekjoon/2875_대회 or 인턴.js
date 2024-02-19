// 그리디 문제
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
let [n, m, k] = input.map(Number); // n 여학생의 수, m 남학생의 수, m 인턴쉽 인원 수
let count = 0;

/**
 * 반복문 종료 조건
 * 1. 여학생이 2명 이하일 경우
 * 2. 남학생이 1명 이하일 경우
 * 3. 한 팀을 구성(여 + 남 - 한팀인원(3))한 후 나머지 학생 수가 인턴쉽에 참여할 k명보다 적을 경우
 */

while (true) {
  if (n < 2 || m < 1 || n + m - 3 < k) break;
  n -= 2;
  m -= 1;
  count++;
}

console.log(count);
