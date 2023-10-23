const [n, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const nums = input.split(' ');

let max = -1000000;
let min = 1000000;

for (let i = 0; i < +n; i++) {
  let num = parseInt(nums[i]);
  if (min > num) min = num;
  if (max < num) max = num;
}

console.log(min, max);
