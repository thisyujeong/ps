/* 
// 풀이 1 (메모리 초과)
const fs = require('fs');
const [str, ...input] = fs.readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

let edit = [...str];
let cursor = str.length;

input.forEach((command) => {
  const [cmd, s] = command.split(' ');
  if (cmd === 'L') {
    if (cursor !== 0) cursor -= 1;
  } else if (cmd === 'D') {
    if (cursor !== edit.length) cursor += 1;
  } else if (cmd === 'B') {
    if (cursor == 0) return;
    edit.splice(cursor - 1, 1);
    cursor -= 1;
  } else {
    edit = [...edit.slice(0, cursor), s, ...edit.slice(cursor)];
    cursor += 1;
  }
});

console.log(edit.join('')); 
*/

/**
 * 풀이 2 (성공)
 * 스택의 pop과 push만을 이용한다.
 * pop과 push는 배열의 맨 끝에 추가/삭제하기 때문에 시간복잡도는 O(1)
 */
const fs = require('fs');
const [str, m, ...input] = fs.readFileSync('./input.txt').toString().trim().split('\n');
const lStack = [...str];
const rStack = [];

for (let i = 0; i < parseInt(m); i++) {
  const [cmd, s] = input[i].split(' ');
  if (cmd === 'L' && lStack.length) rStack.push(lStack.pop());
  if (cmd === 'D' && rStack.length) lStack.push(rStack.pop());
  if (cmd === 'B' && lStack.length) lStack.pop();
  if (cmd === 'P') lStack.push(s);
}

console.log(lStack.join('') + rStack.reverse().join(''));
