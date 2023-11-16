/**
 * 문제에서 주어지는 수의 길이가 1,000,000을 넘지 않는다고 한다.
 * 8진수 표현할 수 있는 수의 가장 큰 수는 7이다. (3비트)
 * 따라서 1,000,000 를 넘지 않도록 주어진 수를 3개씩 조개어 8진수로 변화한다.
 */

let input = require('fs').readFileSync('./input.txt').toString().trim();

function solution() {
  let result = '';
  while (input.length >= 3) {
    result = parseInt(input.slice(input.length - 3), 2).toString(8) + result;
    input = input.slice(0, input.length - 3);
  }
  result = input.length ? parseInt(input, 2).toString(8) + result : result;
  return result;
}

console.log(solution());
