/* 250325 (25m) */
const input = require('fs').readFileSync('./input.txt').toString().split('\n');
const hasCards = input[1].split(' ').map(Number); // 상근이가 가지고있는 숫자카드
const compareCards = input[3].split(' ').map(Number); // 비교할 숫자카드
const count = new Map();

hasCards.forEach((num) => {
  if (count.has(num)) count.set(num, count.get(num) + 1);
  else count.set(num, 1);
});

const answer = compareCards.map((num) => (count.has(num) ? count.get(num) : 0));
console.log(answer.join(' '));
