const N = parseInt(require('fs').readFileSync('./input.txt').toString().trim());
let result = '';

for (let i = 1; i <= N; i++) {
  for (let j = N; j > i; j--) {
    result += ' ';
  }

  for (let j = 0; j < i * 2 - 1; j++) {
    result += '*';
  }

  result += '\n';
}

console.log(result);
