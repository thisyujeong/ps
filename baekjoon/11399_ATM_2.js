const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0];
const times = input[1].split(' ').map(Number);

times.sort((a, b) => a - b);

let total = 0;
let result = 0;
for (let i = 0; i < N; i++) {
  total += times[i];
  result += total;
}

console.log(result);
