/**
 * 1. '()' 열리고 바로 닫히는 케이스 = 레이저
 * - 레이저가 발사될 때마다 + 스택의 길이
 * - 스택의 길이: 쇠막대가 시작(열림)되었으나 아직 끝나지 않은(닫힘) 막대의 수
 * 2. '(' 열린 케이스 = 쇠막대 시작점
 * 3. ')' 닫힌 케이스 = 쇠막대 끝점
 * - 닫힐 때마다 쇠막대의 수 + 1
 */
const input = require('fs').readFileSync('./input.txt').toString().trim();
const parenthesis = input.split('');
const stack = [];
let stickCnt = 0;

for (let i = 0; i < parenthesis.length; i++) {
  const current = parenthesis[i];
  const next = parenthesis[i + 1];
  // 레이저 생성
  if (current === '(' && next === ')') {
    stickCnt += stack.length; // 쇠막대가 시작(열림)되었으나 아직 끝나지 않은(닫힘) 막대의 수
    i++; // 괄호 열릴 때 실행되므로 인덱스를 두번 뛰어넘어야 함.
  }
  // 쇠막대기 시작점
  else if (current === '(') {
    stack.push(current);
  }
  // 쇠막대기 끝점
  else {
    stack.pop();
    stickCnt += 1;
  }
}

console.log(stickCnt);
