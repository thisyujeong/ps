const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();

for (let i = 0; i < T; i++) {
  const logs = input[i * 2 + 1].split(' ').map(Number);
  logs.sort((a, b) => a - b);

  let max = 0;
  for (let i = 2; i < logs.length; i++) {
    max = Math.max(max, Math.abs(logs[i] - logs[i - 2]));
  }

  console.log(max);
}
