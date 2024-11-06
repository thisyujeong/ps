/**
 * TODO: 다시 풀기
 * 투 포인트 문제? 슬라이딩 윈도우 문제!
 * 앞에서부터 뒤 방향으로 종류가 2개 이상인 모든 조합을 탐색
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0]; // 과일의 개수, (1 <= N <= 200,000)
const arr = input[1].split(' ').map(Number); // 막대에 꽂힌 N개의 과일 (종류: 1 ~ 9번)

/* 다른 풀이 참고 */
const count = {}; // 과일 종류별 개수
for (let i = 1; i <= 9; i++) count[i] = 0; // 과일별 개수 초기화

let left = 0;
let right = 0;
let kinds = 0; // 과일 종류 개수
let answer = 0;

while (right < N) {
  if (!count[arr[right]]) kinds++; // right 번째 과일과 같은 종류 과일의 개수 추가
  count[arr[right++]]++; // right 번째 과일의 개수 추가, 동시에 right 인덱스 + 1

  // 과일 종류가 2개 이상일 경우만 수행
  while (kinds > 2) {
    if (count[arr[left]] === 1) kinds--; // left번째 과일과 같은 종류 과일이 1개 남았다면 종류의 수 - 1
    count[arr[left++]]--; // left 번째 과일과 같은 종류의 과일 개수 - 1, 동시에 left 인덱스 + 1
  }

  answer = Math.max(answer, right - left);
}
console.log(answer);
