/**
 * [실패한 접근]
 * 괄호가 열리면 +1, 괄호가 닫히면 -1, 최종적으로 0이 되면 VPS인가?
 * 예외처리를 한다면?
 * 1. 처음이 '('가 아니면 vps가 아님
 * 2. 마지막이 ')'가 아니면 vps가 아님
 * 이렇게 예외처리를 해도 ())))(((() 같은 괄호조합이라면 걸러낼 수 없음
 *
 * ===> Stack 자료구조 활용 [성공한 접근]
 * 1. '(' 열린 괄호면 어떤 값이든 stack.push()
 * 2, ')' 닫힌 괄호면 stack.pop()
 *    > stack.pop()을 했는데 stack이 비어있어서 아무 값도 추출되지 않았다면?
 *    > 애초에 성립될 수 없음 vps가 아님 --> 반복문을 중단하고 No 반환
 * 3. 반복문을 끝까지 순환하고 stack.length을 확인
 *    > stack.length = 0이면 올바른 괄호 조합임으로 vps
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();

function vps(parentheses) {
  const stack = [];
  let check = true;

  for (let i = 0; i < parentheses.length; i++) {
    if (parentheses[i] === '(') {
      stack.push(true);
    } else {
      // stack이 비어있다면
      if (!stack.pop()) {
        check = false;
        break;
      }
    }
  }
  if (stack.length) check = false;
  return check;
}

let result = [];
for (let i = 0; i < T; i++) {
  result.push(vps(input[i]) ? 'YES' : 'NO');
}
console.log(result.join('\n'));

/* 
NO
NO
YES
NO
YES
NO */
