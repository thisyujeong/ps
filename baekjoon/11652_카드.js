/**
 * 정수는 최대 2^53 - 1까지 나타낼 수 있음.
 * N장의 카드에 적힌 숫자는 -2^62보다 크거나 같고, 2^62보다 작거나 같다.
 * JS에서 일반 정수를 나타낼 수 있는 최대치는 2^53 - 1이다.
 * 따라서 2^53 - 1보다 큰 수를 나타낼 수 있는 BigInt를 사용한다.
 */
const fs = require('fs');
const card = fs.readFileSync('./input.txt').toString().trim().split('\n').map(BigInt);
card.shift();

// 문자열 정렬
card.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

let count = 1;
let maxCount = 0;
let maxValue = card[0];

card.map((value, i) => {
  const next = card[i + 1]; // 다음 카드

  // 다음 카드와 같다면 count를 증가
  // 다음 카드와 같지 않다면 count를 1로 초기화
  if (value === next) count++;
  else count = 1;

  // 현재 count가 이전 maxCount보다 크다면 maxCount와 maxValue를 변경
  if (count > maxCount) {
    maxCount = count;
    maxValue = value;
  }
});

// BigInt는 2n 같이 뒤에 n이 붙기 때문에 String 타입으로 변환해주어야 함
console.log(String(maxValue));
