const input = require('fs').readFileSync('./input.txt').toString().trim();
const suffix = [];

for (let i = 0; i < input.length; i++) {
  suffix.push(input.slice(i));
}

console.log(suffix.sort().join('\n'));
