const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const stack = [];
const answer = [];

function prompt(cmd, x) {
  switch (cmd) {
    case 'push': // 정수 X를 스택에 넣는 연산이다.
      stack.push(x);
      break;
    case 'pop': // 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      answer.push(stack.pop() || -1);
      break;
    case 'size': // 스택에 들어있는 정수의 개수를 출력한다.
      answer.push(stack.length);
      break;
    case 'empty': // 스택이 비어있으면 1, 아니면 0을 출력한다.
      answer.push(Number(!stack.length));
      break;
    case 'top': // 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      answer.push(stack.at(-1) || -1);
      break;
  }
}

for (let i = 0; i < n; i++) {
  const [cmd, x] = input[i].split(' ');
  prompt(cmd, +x);
}

console.log(answer.join('\n'));
