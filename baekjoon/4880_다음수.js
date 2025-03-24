const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const len = input.length - 1;
let answer = '';

for (let i = 0; i < len; i++) {
  const [a, b, c] = input[i].split(' ').map(Number);
  if (b - a === c - b) {
    answer += 'AP ' + (c + (b - a)) + '\n';
  }
  if (b / a === c / b) {
    answer += 'GP ' + c * (b / a) + '\n';
  }
}

console.log(answer);
