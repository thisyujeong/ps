function solution(board) {
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // 상하좌우
  const h = board.length;
  const w = board[0].length;

  board = board.map((r) => r.split(''));

  let start;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === 'R') {
        start = [i, j];
      }
    }
  }

  return bfs(start);

  // 말을 어떻게 움직여도 G에 도달할 수 없는 케이스를 어떻게 탐색할까?
  // 직진하고 막다른 길인 경우 해당 좌표만 방문 체크
  function bfs(start) {
    const queue = [[start[0], start[1], 0]]; // r, c, time
    const visited = Array.from({ length: h }, () => new Array(w).fill(0));

    let head = 0;

    while (head < queue.length) {
      const [r, c, time] = queue[head++];

      if (board[r][c] === 'G') return time;

      for (const [dr, dc] of direction) {
        let [mr, mc] = [r, c];

        // 현재 방향으로 직진, 다음 좌표가 막다른 길이라면 중단
        while (isValid(mr + dr, mc + dc)) {
          mr += dr;
          mc += dc;
        }

        // 이동하지 않았다면 해당 방향으로 갈 수 없는 막다른 길
        const isChange = mr !== r || mc !== c;

        // 해당 방향의 다음 좌표가 막다른 길이면 방향 바꿔야 함 - 큐에 추가
        if (isChange && visited[mr][mc] !== 1) {
          queue.push([mr, mc, time + 1]);
          visited[mr][mc] = 1;
        }
      }
    }

    return -1;
  }

  function isValid(r, c) {
    return r >= 0 && c >= 0 && r < h && c < w && board[r][c] !== 'D';
  }
}
