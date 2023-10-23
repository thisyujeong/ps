const input = require('fs').readFileSync('./input.txt').toString().trim();
const N = parseInt(input);
let result = '';

for (let i = 1; i <= N; i++) {
  for (let j = N - i; j > 0; j--) {
    result += ' ';
  }

  for (let k = 0; k < i; k++) {
    result += '*';
  }

  result += '\n';
}

console.log(result);
