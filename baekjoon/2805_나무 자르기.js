/**
 * 1654 랜선 자르기 문제와 거의 유사하다.
 * 한가지 다른 점은 자르려고 하는 나무의 높이가 절단기의 높이보다 높을 경우가 방새한다는 것이다.
 * 즉, [나무 높이 - 절단기 높이 = 가져갈 나무 길이] 인데, 이 연산에서 음수가 나올 수 있으므로 예외처리를 해줘야한다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number); // n = 나무의 수, m = 가져갈 나무의 길이
const trees = input[1].split(' ').map(Number); // 각 나무의 길이

let min = 0;
let max = Math.max(...trees);

while (min <= max) {
  const mid = parseInt((min + max) / 2);
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    if (trees[i] > mid) cnt += trees[i] - mid;
  }

  if (cnt >= m) {
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(max);
