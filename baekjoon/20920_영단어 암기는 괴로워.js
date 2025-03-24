const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number); // n: 지문에 나오는 단어 개수, m: 외울 단어의 길이 기준
const words = input.filter((word) => word.length >= m); // 길이가 m 이상인 단어만 필터링
const list = new Map();
let answer = '';

words.forEach((word) => {
  if (list.has(word)) list.set(word, list.get(word) + 1);
  else list.set(word, 1);
});

words
  .sort() // 알파벳 사전 순 정렬
  .sort((a, b) => b.length - a.length) // 단어의 길이가 길수록 앞에 배치
  .sort((a, b) => list.get(b) - list.get(a)); // 자주 나오는 단어일수록 앞에 배치

// 중복 제거
new Set(words).forEach((word) => (answer += word + '\n'));
console.log(answer);
