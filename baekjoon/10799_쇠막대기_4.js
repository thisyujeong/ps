/* 
입력: 공백없는 괄호의 조합. 한 쌍을 이루는 ()는 레이저를 의미함
    쇠막대기의 왼쪽 끝은 '(', 오른쪽 끝은 ')'로 표현
    괄호의 최대 개수는 100,000 -> O(n^2) 이하?

로직: 1. stack을 활용하거나 
      -> 괄호가 열릴 때마다 push, count / 닫히면 pop
      -> 레이저 만나면? stack에 담긴 개수만큼 추가 카운트
    2. 카운트 변수 활용
      -> 괄호가 열리면 파이프 개수 + 1, 닫히면 파이프개수 -1
      -> 닫힌 괄호의 이전 괄호가 열림 괄호면? = 레이저 
          -> count +=  파이프개수, 레이저가 아니면 count + 1

출력: 개수 출력
*/
const input = require('fs').readFileSync('./input.txt').toString().trim();
const pipeStack = [];
let count = 0;

for (let i = 0; i < input.length; i++) {
  const cur = input[i];
  const next = input[i + 1];

  if (cur === '(' && next === ')') {
    count += pipeStack.length;
    i++;
  } else if (cur === '(') {
    pipeStack.push('(');
    count++;
  } else {
    pipeStack.pop();
  }
}

console.log(count);
