const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

function gcd(a, b) {
  while (a % b !== 0) {
    let c = a % b;
    a = b;
    b = c;
  }
  return b;
}

const sumNums = [];
input.forEach((v) => {
  const numbers = v.split(' ').map(Number);
  sum = 0;
  for (let k = 1; k < numbers.length; k++) {
    for (let j = k + 1; j < numbers.length; j++) {
      sum += gcd(numbers[k], numbers[j]);
    }
  }
  sumNums.push(sum);
});

console.log(sumNums.join('\n'));
