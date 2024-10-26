const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0]; // 보유한 카드 수
const M = +input[2]; // 정수카드의 수
const cards = input[1].split(' ').map((v) => +v); // 보유한 카드
const cards_q = input[3].split(' ').map((v) => +v); // 정수 카드

/* 풀이 1) 반복문, 딕셔너리 객체 활용 - 시간이 오래걸림 */
const count = {};
for (let i = 0; i < N; i++) {
  const c = cards[i];
  count[c] = count[c] + 1 || 1;
}

const answer = [];
for (let j = 0; j < M; j++) {
  const c = cards_q[j];
  answer.push(count[c] || 0);
}

console.log(answer.join(' '));

/* 풀이 2) Map 객체 활용 */
const count2 = new Map();

cards.forEach((n) => {
  // Map 객체인 count2 변수가 n 카드를 하나라도 갖고있다면 n카드의 개수 증가, 없다면 1개 추가
  count2.has(n) ? count2.set(n, count2.get(n) + 1) : count2.set(n, 1);
});

const result = cards_q.map((n) => (count2.has(n) ? count2.get(n) : 0));
console.log(result.join(' '));
