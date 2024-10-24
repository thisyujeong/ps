/**
 * 에라토스테네스의 체 활용
 */
const fs = require('fs');
const [n, input] = fs.readFileSync('./input.txt').toString().trim().split('\n');
const nums = input.split(' ').map((v) => +v);
let count = 0;

for (let i = 0; i < parseInt(n); i++) {
  if (isPrime(nums[i])) count++;
}

console.log(count);

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
