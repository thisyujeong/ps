const N = +require('fs').readFileSync('./input.txt').toString().trim();
let result = '';

for (let i = 1; i <= N; i++) {
  if (i === N) {
    // 마지막 줄
    for (let j = 0; j < i * 2 - 1; j++) {
      result += '*';
    }
    continue;
  }

  for (let j = 0; j < N - i; j++) {
    result += ' ';
  }

  result += '*';

  for (let j = 1; j < (i - 1) * 2; j++) {
    result += ' ';
  }

  if (i != 1) result += '*';
  result += '\n';
}

console.log(result);
