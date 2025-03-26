/* 250326 */
const input = require('fs').readFileSync('./input.txt').toString().trim();

// 풀이 1
let prev = input[0];
let one = input[0] === '1' ? 1 : 0;
let zero = input[0] === '0' ? 1 : 0;

[...input].forEach((curr) => {
  if (curr !== prev) {
    curr === '0' ? zero++ : one++;
    prev = curr;
  }
  쇠;
});

console.log(Math.min(one, zero));

// 풀이 2
const zeroCount = input.split('1').filter((v) => v !== '').length;
const oneCount = input.split('0').filter((v) => v !== '').length;

console.log(Math.min(zeroCount, oneCount));
