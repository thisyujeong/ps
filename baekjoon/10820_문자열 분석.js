const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

//빈 문자열의 경우 예외처리
let except = input.filter((str) => str.length < 1);
if (except.length) input.splice(input.indexOf(except[0]), 1);

input.forEach((str) => {
  // 전체 문자열 길이 - 정규식 조건에 맞는 길이
  const lower = str.length - str.replace(/[a-z]/g, '').length;
  const upper = str.length - str.replace(/[A-Z]/g, '').length;
  const num = str.length - str.replace(/[0-9]/g, '').length;
  const blank = str.length - str.replace(/\ /g, '').length;
  console.log(lower, upper, num, blank);
});
