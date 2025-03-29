/* 250329 1day */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const hats = input.map(Number);
const sum = hats.reduce((prev, cur) => prev + cur, 0);

for (let i = 0; i < hats.length; i++) {
  for (let j = i + 1; j < hats.length; j++) {
    if (hats[i] + hats[j] === sum - 100) {
      hats[i] = hats[j] = -1;
      break;
    }
  }
}

console.log(hats.filter((n) => n !== -1).join('\n'));
