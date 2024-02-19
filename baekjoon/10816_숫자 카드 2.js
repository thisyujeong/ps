/**
 * 10815번 숫자 카드 문제와 동일하게 다음 방법을 활용할 수 있다.
 * 1. 이분탐색을 활용하는 방법
 * 2. Javascript의 Map을 활용하는 방법
 */

// 1. 이분탐색을 활용하는 방법
// 배열 생성 코드가 많아서 메모리와 시간을 만이 소요된다.
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const hasCards = input[1].split(' ').map(Number); // 상근이가 갖고있는 카드
const cardsCount = {}; // 상근이가 갖고있는 각 숫자 카드의 개수
const compareCards = input[3].split(' ').map(Number); // 비교해야할 카드

const count = []; // 각 카드 개수 집합
const hasNewCards = [...new Set(hasCards)].sort((a, b) => a - b); // 상근이가 갖고있는 카드중복 제거, 오름차순 정렬

hasCards.forEach((number) => {
  if (cardsCount[number]) cardsCount[number] += 1;
  else cardsCount[number] = 1;
});

function getCardCount(card) {
  let min = 0;
  let max = hasNewCards.length - 1;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    if (hasNewCards[mid] === card) return cardsCount[card];
    if (hasNewCards[mid] < card) min = mid + 1;
    else max = mid - 1;
  }

  return 0;
}

for (let i = 0; i < compareCards.length; i++) {
  count.push(getCardCount(compareCards[i]));
}

console.log(count.join(' '));

// 2. Javascript의 Map을 활용하는 방법
/* const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const hasCards = input[1].split(' ').map(Number);
const cards = input[3].split(' ').map(Number);
const hasCardsMap = new Map();
const answer = [];

for (card of hasCards) {
  if (hasCardsMap.has(card)) {
    hasCardsMap.set(card, hasCardsMap.get(card) + 1);
  } else {
    hasCardsMap.set(card, 1);
  }
}

for (card of cards) {
  if (hasCardsMap.has(card)) answer.push(hasCardsMap.get(card));
  else answer.push(0);
}

console.log(answer.join(' ')); */
