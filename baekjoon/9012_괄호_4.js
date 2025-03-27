/* 250327 (2day, 10m) */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
+input.shift();

const isVPS = (ps) => {
  const stack = [];

  if (ps[0] === ')') return 'NO';

  for (let i = 0; i < ps.length; i++) {
    if (ps[i] === '(') {
      stack.push('(');
    }
    if (ps[i] === ')') {
      if (stack.length < 1) return 'NO';
      stack.pop();
    }
  }

  return stack.length > 0 ? 'NO' : 'YES';
};

const result = input.map((ps) => isVPS(ps));
console.log(result.join('\n'));
