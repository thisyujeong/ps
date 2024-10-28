const input = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
const n = +input.shift();

function solution(nums) {
  const cut = Math.round(n * 0.15);
  const levels = nums.sort((a, b) => a - b).slice(cut, n - cut);

  return Math.round(levels.reduce((acc, cur) => acc + cur, 0) / levels.length);
}

console.log(n ? solution(input) : 0);
