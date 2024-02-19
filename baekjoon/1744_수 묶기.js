/**
 * 그리디 문제
 * 주어진 입력을 양수와 양수가 아닌 수로 나눈다.
 * 양수는 내림차순 정렬, 양수가 아닌 수는 오름차순으로 정렬
 * 각 배열에서 [i번째 수와 i+1번째 수의 합]과 [i번째 수와 i+1번째 수의 곱]중 더 큰 값을 가지는 연산을 이용
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const arr = input.map(Number);
let sum = 0;
let positive = arr.filter((v) => v > 0).sort((a, b) => b - a); // 양수 내림차순
let negative = arr.filter((v) => v <= 0).sort((a, b) => a - b); // 0 또는 음수 오름차순

// 양수
for (let i = 0; i < positive.length; i += 2) {
  if (i === positive.length - 1) sum += positive[i];
  else if (positive[i] * positive[i + 1] > positive[i] + positive[i + 1]) {
    sum += positive[i] * positive[i + 1];
  } else {
    sum += positive[i] + positive[i + 1];
  }
}

// 음수
for (let i = 0; i < negative.length; i += 2) {
  if (i === negative.length - 1) sum += negative[i];
  else sum += negative[i] * negative[i + 1];
}

console.log(sum);
