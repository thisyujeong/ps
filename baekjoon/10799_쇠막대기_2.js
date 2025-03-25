/* 250325 (45m) */
const brackets = require('fs').readFileSync('./input.txt').toString().trim();
const len = brackets.length;

// 풀이 1 - stack 활용
const stack = [];
let stickCnt = 0;

for (let i = 0; i < len; i++) {
  let curr = brackets[i];
  let next = brackets[i + 1];

  // 레이저인 경우 열린 괄호 개수만큼 추가, 다다음 괄호로 건너뛰기
  if (curr === '(' && next === ')') {
    stickCnt += stack.length;
    i += 1;
  }
  // 괄확 닫히면 스택에 추가하고 막대개수 + 1
  else if (curr === ')') {
    stack.pop();
    stickCnt += 1;
  }
  // 괄호가 열리면 스택에 추가
  else stack.push(curr);
}

console.log(stickCnt);

// 풀이 2 연산활용
let pipeCnt = 0;
let result = 0;

for (let i = 0; i < len; i++) {
  let prev = brackets[i - 1];
  let curr = brackets[i];

  if (curr === '(') {
    pipeCnt++;
  } else {
    pipeCnt--;

    if (prev === '(') {
      result += pipeCnt;
    } else {
      result++;
    }
  }
}

console.log(result);
