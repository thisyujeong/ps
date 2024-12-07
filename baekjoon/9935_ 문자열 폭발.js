const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const str = input[0];
const bomb = input[1]; // 폭발 문자열
const bombLen = bomb.length;

const stack = [];

for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);

  if (str[i] === bomb[bombLen - 1]) {
    // 위에서 bomb 길이만큼 복사
    let copy = stack.slice(-bombLen);
    // 복사한 문자열이 bomb 문자열과 같다면 stack에서 제거
    if (copy.join('') === bomb) stack.splice(-bombLen);
  }
}

console.log(stack.length ? stack.join('') : 'FRULA');
