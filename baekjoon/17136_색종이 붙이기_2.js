/**
 * 7:45
 * 입력: 정사각형 모양을 한 다섯 종류의 색종를 5개씩 가지고 있다. - 1x1, 2x2, 3x3, 4x4, 5x5
 *     색종이 크기 10x10인 종이 위, 각 칸에는 0 또는 1이 적혀있다
 *     1: 색종이로 덮어야 하는 칸, 0: 색종이가 있으면 안되는 칸
 *
 * 로직: 완탐, 백트래킹? - dfs
 *      1. 색종이를 붙일 수 있다면 (1)
 *         - 붙일 수 없다면 재탐색
 *      2. 붙일 수 있는 칸이라면? 색종이 사이즈 선택
 *          - 큰 사이즈의 색종이 부터 선택 -> 빠르게 최소 개수를 구할 확률이 높음
 *          - 선택한 색종이의 개수가 남았는지 확인, 범위 확인
 *      3. 붙인다 / 제거한다
 *          - 붙인다면 색종이 개수 증가
 *          - 제거한다면 색종이 개수 차감 -> 다른 경우의 수를 위해
 *      4. 최종확인
 *
 * 출력: 1이 적힌 모든 칸을 붙이는데 필요한 색종이의 최소 개수
 *      모두 덮는 것이 불가능한 경우 -1 출력
 *
 */
const PAPER_SIZE = 10;
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const paper = input.map((line) => line.split(' ').map(Number));
const paperCount = new Array(6).fill(5);
let minCount = Infinity;

// 종이 붙일 수 있는지 체크
const canAttach = (r, c, size) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (!isIn(i, j) || paper[r][c] !== paper[i][j]) return false;
    }
  }
  return true;
};

const attach = (r, c, size, value) => {
  // value = 0: 붙이기, 1: 떼기
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      paper[i][j] = value;
    }
  }
};

// 종이 범위 체크
const isIn = (r, c) => {
  return r < PAPER_SIZE && c < PAPER_SIZE;
};

const dfs = (r, c, cnt) => {
  if (minCount <= cnt) return;

  if (c >= PAPER_SIZE) {
    dfs(r + 1, 0, cnt);
    return;
  }
  if (r >= PAPER_SIZE) {
    minCount = Math.min(minCount, cnt);
    return;
  }

  // 색종이를 붙일 수 있는 칸이라면
  if (paper[r][c]) {
    for (let size = 5; size > 0; size--) {
      // 선택한 size의 색종이 개수가 남아있고, 해당 색종이를 붙일 수 있다면
      if (paperCount[size] && canAttach(r, c, size)) {
        // 붙이고, 색종이 남은 개수 차감
        attach(r, c, size, 0);
        paperCount[size]--;

        // 다음 탐색
        dfs(r, c + 1, cnt + 1);

        // 다른 경우의 수를 위해 다시 떼고, 색종이 남은 개수 원복
        attach(r, c, size, 1);
        paperCount[size]++;
      }
    }
  } else {
    dfs(r, c + 1, cnt);
  }
};

dfs(0, 0, 0);
console.log(minCount === Infinity ? -1 : minCount);
