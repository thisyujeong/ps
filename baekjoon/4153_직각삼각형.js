/**
 * 피타고라스의 정리
 * a^2 + b^2 = c^2
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
let result = '';

input.map((tc, i) => {
  const nums = tc.split(' ').map(Number);
  const [a, b, c] = nums.sort((a, b) => a - b);
  if (c === 0) return;
  if (a ** 2 + b ** 2 === c ** 2) result += 'right\n';
  else result += 'wrong\n';
});

console.log(result);
