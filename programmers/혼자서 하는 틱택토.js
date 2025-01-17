function solution(board) {
  board = board.map((v) => v.split('')).flat(); // 1차원 배열로 변환

  let [oCount, xCount] = [0, 0];

  for (const sign of board) {
    if (sign === 'O') oCount++;
    if (sign === 'X') xCount++;
  }

  // 1. X의 개수가 O보다 많을 수 없음
  if (oCount < xCount) return 0;

  // 2. O와 X의 개수 차이가 2 이상일 수 없음
  if (oCount - xCount > 1) return 0;

  const isWinO = isWinCheck(board, 'O');
  const isWinX = isWinCheck(board, 'X');

  // 3. O가 이긴 경우 X가 더 놓을 수 없음, X 개수는 O개수의 -1
  if (isWinO && xCount !== oCount - 1) return 0;

  // 4. X가 이긴 경우 O, X의 개수가 다를 수 없음
  if (isWinX && oCount !== xCount) return 0;

  return 1;
}

function isWinCheck(board, sign) {
  // 직선들의 정보
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] === sign && board[b] === sign && board[c] === sign) return true;
  }

  return false;
}
