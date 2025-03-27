/* 250326 (1day, 15m) */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
let answer = '';

const isVPS = (ps, idx) => {
  if (ps[0] === ')') return 'NO';

  const stack = [];
  const len = ps.length;

  for (let i = 0; i < len; i++) {
    const parentheses = ps[i];
    if (parentheses === '(') {
      stack.push('(');
    }
    if (parentheses === ')') {
      if (stack.length <= 0) return 'NO';
      stack.pop();
    }
  }

  return stack.length > 0 ? 'NO' : 'YES';
};

for (let i = 0; i < n; i++) {
  answer += isVPS(input[i], i) + '\n';
}

console.log(answer);
