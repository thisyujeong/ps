/**
 * 테스트 케이스 1 = { headgear: 2, eyewear: 1 }
 * 1. headgear를 입는 경우의 수 2가지, 아예 입지 않는 경우 1가지
 * 2. eyewear를 입는 경우의 수 1가지, 아예 입지 않는 경우 1가지
 * 입을 수 있는 옷의 조합 = (2 + 1) * (1 + 1) = 6가지
 *
 * 출력 조건: 알몸이 아닌 상태로 의상을 입을 수 있는 경우의 수
 * 입을 수 있는 옷의 조합 - 모든 옷을 입지 않는 경우 = 6가지 - 1가지 = 5가지
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift(); // T <= 100

for (let i = 0; i < T; i++) {
  const n = +input.shift(); // 해빈이가 가진 의상 수 (0 ≤ n ≤ 30)
  const arr = input.splice(0, n).map((v) => v.split(' '));
  const closet = {};

  for (let j = 0; j < n; j++) {
    const [_, kind] = arr[j];
    closet[kind] = closet[kind] + 1 || 1;
  }

  let combination = 1;
  for (let key in closet) {
    combination *= closet[key] + 1; // 조합할 수 있는 모든 경우의 수
  }

  console.log(combination - 1); // 모든 옷을 입지 않은 경우의 수(1) 빼기
}
