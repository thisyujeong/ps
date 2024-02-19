/**
 * TODO: 다시 풀기
 */
const N = +require('fs').readFileSync('./input.txt').toString().trim();
/* 
// # solution 1
const row = N;
const col = N * 2 - 1;
const arr = Array.from({ length: row }, () => new Array(col).fill(' ')); // 배열 초기화

star(N, N - 1, 0);

// output
for (let i = 0; i < N; i++) {
  console.log(arr[i].join(''));
}

function star(n, x, y) {
  if (n === 3) {
    // 별을 그린다.
    arr[y][x] = '*';
    arr[y + 1][x - 1] = '*';
    arr[y + 1][x + 1] = '*';
    arr[y + 2][x - 2] = '*';
    arr[y + 2][x - 1] = '*';
    arr[y + 2][x] = '*';
    arr[y + 2][x + 1] = '*';
    arr[y + 2][x + 2] = '*';
    return;
  }

  star(n / 2, x, y);
  star(n / 2, x - n / 2, y + n / 2);
  star(n / 2, x + n / 2, y + n / 2);
}
 */

// # solution 2
function drawStars(n) {
  const result = [];
  if (n === 3) {
    result.push('  *  ');
    result.push(' * * ');
    result.push('*****');
    return result;
  }

  const half = n / 2;
  const space = ' '.repeat(half);
  const stars = drawStars(half);

  stars.forEach((star) => result.push(`${space}${star}${space}`));
  stars.forEach((star) => result.push(`${star} ${star}`));
  return result;
}

const stars = drawStars(N);
console.log(stars.join('\n'));
