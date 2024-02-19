const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = input.shift().split(' ').map(Number);
const coins = input.map(Number);

let total = K;
let count = 0;

for (let i = N - 1; i >= 0; i--) {
  if (coins[i] <= total) {
    const cnt = Math.floor(total / coins[i]);
    total = total % coins[i];
    count += cnt;
  }
}

console.log(count);
