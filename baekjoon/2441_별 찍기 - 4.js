const input = require('fs').readFileSync('./input.txt').toString().trim();
const N = parseInt(input);
let result = '';

for (let i = N; i > 0; i--) {
  for (let j = 0; j < N - i; j++) {
    result += ' ';
  }
  for (let j = 0; j < i; j++) {
    result += '*';
  }
  result += '\n';
}

console.log(result);
