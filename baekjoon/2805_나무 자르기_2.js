/**
 * 이분탐색 문제
 * 1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 2,000,000,000
 * 제약조건으로 보아 나무의 최대 길이가 20억미터가 된다 (2 * 10^8)
 * 이분탐색을 통해 시간복잡도를 단축시켜야한다.
 * 이분탐색은 탐색할때마다 데이터의 탐색 범위가 절반씩 줄어들기 때문에 시간복잡도 O(logn)이 된다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number); // n: 나무의 수, m: 필요한 나무의 길이
const trees = input[1].split(' ').map(Number);

let min = 0;
let max = Math.max(...trees);

while (min <= max) {
  const height = parseInt((max + min) / 2);
  let pieces = 0;

  for (let tree of trees) {
    if (tree > height) pieces += tree - height;
  }

  if (pieces >= m) min = height + 1;
  else max = height - 1;
}

console.log(max);
