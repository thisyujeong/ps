/**
 * 그리디 문제
 * 1.연산자는 +, - 만 존재하므로 - 를 기준으로 분리한 후 분리된 숫자들을 그룹별로 합한다.
 *   55-50+40 -> [[55], [50+40]] -> [[55], [90]]
 * 2.합으로 구성된 배열을 차례로 빼준다.
 *   55-90 = -35
 */
const input = require('fs').readFileSync('./input.txt').toString().trim();
const numbers = input.split('-').map((nums) =>
  nums
    .split('+')
    .map((v) => +v)
    .reduce((a, b) => a + b, 0)
);

console.log(numbers.reduce((a, b) => a - b));
