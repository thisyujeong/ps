/**
 * 이분탐색 문제
 * min는 최소값, max는 주어진 랜선 중 가장 긴 랜선의 길이로 초기 탐색범위를 지정한다.
 * 지정한 범위 내에서 이분 탐색을 진행한다.
 *
 * mid(=pivot) 값을 기준으로 하여,
 * mid 값으로 나눈 랜선 수보다 크다면 min + 1값을 mid + 1값으로 재할당하고
 * mid 값으로 나눈 랜선 수보다 작다면 max값을 mid - 1값으로 재할당한다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [k, n] = input.shift().split(' ').map(Number); // k = 보유한 랜선 개수, n = 필요한 랜선 개수
const lines = input.map(Number);

let max = Math.max(...lines); // 보유한 랜선 중 가장 큰 랜선의 길이
let min = 1; // 최소 범위

while (min <= max) {
  // pivot
  let mid = parseInt((max + min) / 2);

  // 각 랜선의 길이에서 몇개의 랜선이 나올 수 있는지 확인, 각 랜선에서 나오는 랜선 수의 총 합을 구함
  let pieces = lines.map((line) => parseInt(line / mid)).reduce((a, b) => a + b, 0); //

  // 자른 랜선의 개수가 필요한 랜선의 개수보다 많다면 최소 범위 변경
  if (pieces >= n) {
    min = mid + 1;
  }
  // 자른 랜선의 개수가 필요한 랜선의 개수보다 적다면 최대 범위 변경
  else {
    max = mid - 1;
  }
}

console.log(max);
