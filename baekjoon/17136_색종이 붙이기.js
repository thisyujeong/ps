/**
 * TODO:다시 풀기, 개념 숙지할 것
 * 입력: 10x10 크기 2차원 배열 - 종이, 1: 색종이로 덮어야하는 칸, 0: 색종이가 있으면 안되는 칸
 *      색종이 종류 1x1, 2x2, 3x3, 4x4, 5x5 사이즈 각 5개씩
 *
 * 로직: 완전탐색 + 백트래킹 문제
 *      큰 색종이를 먼저 붙여볼수록 가장 적게 붙일 확률이 높아진다?
 *      1. 색종이를 붙일 수 있는가? 해당 칸이 1인가?
 *        1.1 붙일 수 없다면 - dfs 재실행?
 *      2. 붙일 수 있다면 어떤 사이즈의 색종이를 선택할 것인가?
 *        -> 선택한 색종이가 남아있는가
 *        -> 큰 사이즈의 색종이부터 붙일 수 있는지 확인 (범위도 체크)
 *      3. 붙인다 / 제거한다
 *        -> 붙인다면 색종이이 개수를 줄인다
 *        -> 제거한다면 색종이 개수를 다시 늘린다. -> 다른 경우의 수를 위해
 *      4. 최종 확인
 *
 * 출력: 1을 모두 덮는데 필요한 색종이 최소 개수
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const paper = input.map((line) => line.split(' ').map(Number)); // 1: 색종이를 붙일 수 있음, 0: 색종이를 붙일 수 없음
const paperCnt = Array.from({ length: 6 }, () => 5); // 각 색종이 크기별 남은 개수
const SIZE = 10;

let minCnt = Infinity;

/* 색종이를 붙일 수 있는지 체크 */
const canAttach = (r, c, size) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (!isIn(i, j) || !paper[i][j]) return false;
    }
  }
  return true;
};

/* 색종이 붙이거나 떼기 */
const attach = (r, c, size, value) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      paper[i][j] = value;
    }
  }
};

/* 범위 내에 포함되는지 체크 */
const isIn = (r, c) => {
  return r < SIZE && c < SIZE;
};

const dfs = (r, c, cnt) => {
  if (minCnt <= cnt) return; // 이미 최소값보다 많이 사용

  // 가로 방향으로 모두 순회했다면 다음 행으로 이동
  if (c >= SIZE) {
    dfs(r + 1, 0, cnt);
    return;
  }

  // 세로방향으로 모두 순회했다면 가장 최소의 값 업데이트
  if (r >= SIZE) {
    minCnt = Math.min(minCnt, cnt);
    return;
  }

  // 색종이를 붙일 수 있는 칸
  if (paper[r][c]) {
    for (let size = 5; size > 0; size--) {
      // 해당 종이가 남아있지 않거나, 종이를 붙일 수 없는 칸이라면
      if (paperCnt[size] > 0 && canAttach(r, c, size)) {
        attach(r, c, size, 0); // 색종이 붙이기
        paperCnt[size]--;
        dfs(r, c + 1, cnt + 1); // 색종이 떼기
        attach(r, c, size, 1);
        paperCnt[size]++;
      }
    }
  } else {
    dfs(r, c + 1, cnt);
  }
};

dfs(0, 0, 0);
console.log(minCnt === Infinity ? -1 : minCnt);
