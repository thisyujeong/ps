const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map((v) => +v);
const arr = input[1].split(' ').map((v) => +v);

/* 1. 반복문 활용 - 3중 반복문을 풀이 O(n^3) */
function solution(cards) {
  let result = 0;
  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        const sum = cards[i] + cards[j] + cards[k];
        if (sum <= M) {
          result = result > sum ? result : sum;
        }
      }
    }
  }
  return result;
}

console.log(solution(arr));

/* 2. 재귀 활용 - 백트래킹 풀이 O(n)? */
function blackjack(cards) {
  result = 0;

  function backtracking(start, curr, sum) {
    // 카드의 합이 M을 초과할 경우
    if (sum > M) return;
    // 카드 개수가 3개일 경우
    if (curr.length === 3) {
      result = result > sum ? result : sum;
      return;
    }
    for (let i = start; i < N; i++) {
      curr.push(cards[i]);
      backtracking(i + 1, curr, sum + cards[i]);
      curr.pop();
    }
  }

  backtracking(0, [], 0);
  return result;
}

console.log(blackjack(arr));
