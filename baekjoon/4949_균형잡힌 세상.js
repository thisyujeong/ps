/* 괄호의 짝 여부를 가르는 문제는 주로 Stack 문제 */

// 주어진 문자열의 길이는 100 글자보다 작거나 같다.
// - 시간복잡도에 크게 영향을 주지 않음.
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

function balanceCheck(str) {
  const stack = [];
  let balance = true;

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    // 열린 대소괄호
    if (letter === '[' || letter === '(') {
      stack.push(letter);
    }
    // 닫힌 대괄호
    if (letter === ']' && stack.pop() !== '[') {
      balance = false;
      break;
    }
    // 닫힌 소괄호
    if (letter === ')' && stack.pop() !== '(') {
      balance = false;
      break;
    }
  }
  // 괄호가 남은 경우
  if (!!stack.length) balance = false;
  return balance;
}

let result = '';
for (let i = 0; i < input.length - 1; i++) {
  result += (balanceCheck(input[i]) ? 'yes' : 'no') + '\n';
}
console.log(result);
