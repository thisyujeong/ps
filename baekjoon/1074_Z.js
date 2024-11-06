/**
 * 분할정복 문제
 * https://2duckchun.tistory.com/m/453
 * TODO: 분할정복 문제 연습
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [N, r, c] = input.map(Number);

let answer = 0;
function recursive(row, col, size) {
  const half = size / 2;

  // 1 x 1 사이즈까지 분할하여 [r, c] 좌표를 찾았다면 중단
  if (row === r && col === c) {
    console.log(answer);
    return;
  }

  // 찾고자하는 좌표 [r, c]가 해당 부분 내에 속해있는지 체크
  if (r >= row && r < row + size && c >= col && c < col + size) {
    recursive(row, col, half);
    recursive(row, col + half, half);
    recursive(row + half, col, half);
    recursive(row + half, col + half, half);
    return;
  }
  // 해당 사각형에 속하지 않았다면 영약 내 칸 개수만큼 추가
  answer += size * size;
}

recursive(0, 0, 2 ** N);
