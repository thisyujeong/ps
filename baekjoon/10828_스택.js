const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const N = input.shift();

const stack = [];
const answer = [];

for (let i = 0; i < N; i++) {
  let [order, x] = input[i].split(' ');
  let isNall = stack.length === 0;

  if (x !== undefined) {
    x = parseInt(x);
    stack.push(x);
  } else if (order === 'pop') {
    answer.push(isNall ? -1 : stack.pop());
  } else if (order === 'size') {
    answer.push(stack.length);
  } else if (order === 'top') {
    answer.push(isNall ? -1 : stack[stack.length - 1]);
  } else if (order === 'empty') {
    answer.push(isNall ? 1 : 0);
  }
}

console.log(answer.join('\n'));
