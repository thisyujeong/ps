/**
 * ASCII Code
 * a: 97, z: 122 / A: 65, Z: 90
 * 모두 공백 문자거나, 첫 문자가 공백이 들어올 경우를 고려하지 않아 오답처리되었다.
 * 공백도 처리해주기 위해 input 값을 읽어올 때, trim()을 하지 않도록 수정
 */
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('');
const answer = [];

input.forEach((str) => {
  const origin = str.charCodeAt();
  let decode = origin + 13;

  if (65 <= origin && origin <= 90) {
    // 대문자
    decode = 90 < decode ? 64 + decode - 90 : decode;
    answer.push(String.fromCharCode(decode));
  } else if (97 <= origin && origin <= 122) {
    // 소문자
    decode = 122 < decode ? 96 + decode - 122 : decode;
    answer.push(String.fromCharCode(decode));
  } else {
    // 공백 또는 숫자
    answer.push(str);
  }
});

console.log(answer.join(''));
