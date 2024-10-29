const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = input.shift().split(' ').map(Number); // N: 동전 N종류, K 목표 합
const coins = input.map(Number);

let total = K;
let count = 0;

for (let i = coins.length - 1; i >= 0; i--) {
  if (coins[i] <= total) {
    count += Math.floor(total / coins[i]);
    total = total % coins[i];
  }
}
console.log(count);
