/* 250326 (2day) */
const input = require('fs').readFileSync('./input.txt').toString().trim();
const stack = [];
let answer = 0;

// 풀이 1
for (let i = 0; i < input.length; i++) {
  const curr = input[i];
  const next = input[i + 1];

  if (curr === '(' && next === ')') {
    answer += stack.length;
    i++;
  } else if (curr === '(') {
    stack.push('(');
  } else {
    stack.pop();
    answer++;
  }
}

console.log(answer);

// 풀이 2
let pipe = 0;
let answer2 = 0;
for (let i = 0; i < input.length; i++) {
  const prev = input[i - 1];
  const curr = input[i];

  if (curr === '(') {
    pipe++;
  } else {
    pipe--;
    if (prev === '(') answer2 += pipe;
    else answer2++;
  }
}
console.log(answer2);
