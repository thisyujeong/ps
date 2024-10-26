/**
 * 괄호가 열릴 때마다 스택에 추가(push)하고, 괄호가 닫힐 때마다 스택에서 제거(pop)
 * - 괄호가 닫힐 때 pop할 스택 원소가 없다면 VPS가 아님
 * - 스택 원소가 남아있다면 VPS가 아님
 */
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const answer = [];

for (let i = 0; i < N; i++) {
  const parenthesis = input[i].split('');
  const stack = [];
  let result = 'YES';

  for (let j = 0; j < parenthesis.length; j++) {
    // open
    if (parenthesis[j] === '(') {
      stack.push(1);
    }
    // close
    else if (!stack.pop()) {
      result = 'NO';
      break;
    }
  }

  if (stack.length !== 0) result = 'NO';
  answer[i] = result;
}

console.log(answer.join('\n'));
