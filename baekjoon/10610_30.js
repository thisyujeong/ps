/**
 * 그리디 문제
 * 1. 30의 배수이므로 마지막 자리의 수는 무조건 0으로 끝난다.
 *    즉 0이 포함되지 않은 값은 30의 배수가 될 수 없다.
 * 2. 각 자리 수를 모두 더한 합이 3으로 나누어진다면 그 수는 3의 배수다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('');
const num = input.map(Number).sort((a, b) => b - a);

const solution = () => {
  if (!num.includes(0)) return -1;

  const sum = num.reduce((acc, cur) => acc + cur, 0);

  if (sum % 3 !== 0) return -1;
  return num.join('');
};

console.log(solution());
