const input = require('fs').readFileSync('./input.txt').toString().trim();
let answer = '';

for (let i = 0; i < input.length; i++) {
  answer += input[i];
  if ((i + 1) % 10 === 0) {
    answer += '\n';
  }
}
console.log(answer);
