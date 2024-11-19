const input = require('fs').readFileSync('input.txt').toString().trim().split(' ');
const [n, m] = input.map(Number);

const sequence = new Array(m);
const result = [];
function backtracing(start, index) {
  if (index === m) {
    result.push(sequence.join(' '));
    return;
  }

  for (let i = start; i <= n; i++) {
    sequence[index] = i;
    backtracing(i, index + 1);
  }
}

backtracing(1, 0);
console.log(result.join('\n'));
