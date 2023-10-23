const input = require('fs').readFileSync('./input.txt').toString().trim();
let star = '';
let result = '';

for (let i = 0; i < +input; i++) {
  star += '*';
  result += star + '\n';
}

console.log(result);
