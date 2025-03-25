/* 250325 (20m) */
// 풀이 1
const input = require('fs').readFileSync('./input.txt').toString().trim();
let prev = input[0];
let count = prev == 0 ? [1, 0] : [0, 1];

[...input].forEach((curr) => {
  if (prev !== curr) {
    curr == 0 ? count[0]++ : count[1]++;
    prev = curr;
  }
});

console.log(Math.min(...count));

// 풀이 2
const oneCount = input.split('1').filter((v) => v !== '').length;
const zeroCount = input.split('0').filter((v) => v !== '').length;
console.log(Math.min(oneCount, zeroCount));
