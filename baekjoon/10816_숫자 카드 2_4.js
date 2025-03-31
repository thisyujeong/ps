/* 250328 4day, 이분탐색 풀이 추가 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

/* 1. 해시 맵 풀이 */
const solve1 = (input) => {
  const cards = input[1].split(' ').map(Number);
  const fineCards = input[3].split(' ').map(Number);

  const count = new Map();
  cards.forEach((card) => {
    count.has(card) ? count.set(card, count.get(card) + 1) : count.set(card, 1);
  });

  const result = fineCards.map((card) => (count.has(card) ? count.get(card) : 0));
  console.log(result.join(' '));
};

solve1(input);

/* 2. 이분탐색 풀이 (오래걸림) */
const solve2 = (input) => {
  const cards = input[1].split(' ').map(Number);
  const findCards = input[3].split(' ').map(Number);
  const result = [];

  let min = 0;
  let max = cards.length;

  cards.sort((a, b) => a - b);

  const lowerBound = (start, end, target) => {
    while (start < end) {
      let mid = parseInt((end + start) / 2);
      if (cards[mid] >= target) end = mid;
      else start = mid + 1;
    }
    return end;
  };

  const upperBound = (start, end, target) => {
    while (start < end) {
      let mid = parseInt((end + start) / 2);
      if (cards[mid] > target) end = mid;
      else start = mid + 1;
    }
    return end;
  };

  findCards.forEach((card) => {
    result.push(upperBound(min, max, card) - lowerBound(min, max, card));
  });

  console.log(result.join(' '));
};

solve2(input);
