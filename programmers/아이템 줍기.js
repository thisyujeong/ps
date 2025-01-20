// 13:02 - 두시간 초과..
// BFS 문제
// solution: 좌표의 크기와 좌표 값들을 2배로 늘려
// 직사각형의 가장자리와 내부, 외부를 분리한다

const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(rectangles, characterX, characterY, itemX, itemY) {
  const board = Array.from({ length: 103 }, () => new Array(103).fill(0));

  // 모든 좌표값들을 2배로 늘림
  rectangles = rectangles.map((rec) => rec.map((val) => val * 2));
  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;

  // 직사각형이 있는 좌표 칠하기
  // 0: 직사각형 내부, 1: 가장자리, 2: 직사각형 내부
  rectangles.forEach((rectangle) => {
    const [x1, y1, x2, y2] = rectangle;
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (y === y1 || y === y2 || x === x1 || x === x2) {
          if (board[y][x] === 0) board[y][x] = 1;
        } else {
          board[y][x] = 2;
        }
      }
    }
  });

  const queue = [[characterX, characterY, 0]]; // startX, startY, count
  board[characterY][characterX] = 0;

  while (queue.length) {
    const [x, y, cnt] = queue.shift();

    if (x === itemX && y === itemY) return cnt / 2;

    for (const [dx, dy] of direction) {
      const [nx, ny] = [x + dx, y + dy];
      if (board[ny][nx] === 1) {
        queue.push([nx, ny, cnt + 1]);
        board[ny][nx] = 0;
      }
    }
  }

  return 0;
}
