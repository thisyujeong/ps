const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const times = input[0].split(' ').map(Number);

let total = 0;
let sum = 0;

// 인출하는 시간이 가장 짧은 사람 기준 오름차순 정렬
times.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  sum += times[i];
  total += sum;
}

console.log(total);
