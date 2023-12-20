/**
 * 이 문제는 이분탐색을 통해서 풀 수도 있지만,
 * Javascript의 Set()을 사용하면 굉장히 간결한 코드로 해결할 수 있다.
 *
 * 이분탐색에 익숙해지기 위해 두 방법 모두 사용하여 풀었다.
 */

// 1. 이분탐색 활용
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0]; // 상근이가 가지고 있는 카드 수
const m = +input[2]; // 비교해야 할 카드 수
const cards = input[1] // 상근이가 가지고 있는 카드, 오름차순 정렬
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const compareCards = input[3].split(' ').map(Number); // 비교해야 할 m개의 카드

function hasCardCheck(card) {
  let min = 0; // 최소 값을 갖는 숫자 카드의 인덱스
  let max = n - 1; // 최대 값을 갖는 숫자 카드의 인덱스

  while (min <= max) {
    let mid = Math.floor((min + max) / 2); // min, max 범위의 중간 인덱스

    if (cards[mid] === card) return 1; // 같은 숫자의 카드를 찾았다면 1 리턴

    // 기준(피봇)값이 찾고자하는 카드 값보다 크다면 min 범위 인덱스 변경
    if (cards[mid] < card) min = mid + 1;
    // 반대로 기준(피봇)값이 찾고자하는 카드 값보다 작다면 max 범위 인덱스 변경
    else max = mid - 1;
  }

  return 0;
}

let result = [];
for (let i = 0; i < m; i++) {
  result.push(hasCardCheck(compareCards[i]));
}

console.log(result.join(' '));

// 2. JS의 Set 활용
/* const cards = new Set(input[1].split(' ').map(Number));
const compareCards = input[3].split(' ').map(Number);
const answer = [];

for (let i = 0; i < m; i++) {
  if (cards.has(compareCards[i])) answer.push(1);
  else answer.push(0);
}

console.log(answer.join(' '));
 */
