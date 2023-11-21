/** 풀이 실패, 다른 사람 풀이 분석 */
const file = require('fs').readFileSync('./input.txt').toString().trim();
const input = file.split('\n').map((v) => v.split(' ').map(Number));

const [a, b] = input[0]; // A진법, B진법
const m = input[1]; // A진법으로 표현된 자릿수의 개수(m)
const nums = input[2].reverse(); // A진법을 이루고 있는 숫자 m개, 10진수 변환 시 뒤에서부터 앞의 사진까지
const result = [];
let decimal = 0;

// A진수 -> 10진수 변환
// 17진수 -> 10진수 변환이라고 가정하면,
// [2, 16] -> reverse -> [16, 2] -> (16 * 17^0) + (2 * 17^1) = 50
for (let i = 0; i < m; i++) {
  decimal += nums[i] * Math.pow(a, i);
}

// 10진수 -> B진수
// 십진수가 0이면 0 출력
if (decimal === 0) console.log(0);
else {
  // 십진수가 0 이상일 경우 while 반복문 실행
  while (decimal > 0) {
    // 십진수를 B로 나눈 나머지 값을 저장 (B진수)
    result.unshift(decimal % b);
    // 십진수를 B로 나눈 몫으로 변경
    decimal = Math.floor(decimal / b);
  }

  console.log(result.join(' '));
}
