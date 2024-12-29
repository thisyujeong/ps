function solution(land) {
  const n = land.length; // 행
  const m = land[0].length; // 열
  const oils = Array(m).fill(0);
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let visited = Array.from({ length: n }, () => Array(m).fill(false));

  for (let col = 0; col < m; col++) {
    for (let row = 0; row < n; row++) {
      if (land[row][col] === 1 && !visited[row][col]) {
        bfs(row, col);
      }
    }
  }

  function bfs(r, c) {
    const queue = [[r, c]];
    const columnSet = new Set(); // 오일이 있는 column 정보 저장
    let size = 0;
    visited[r][c] = true;

    while (queue.length) {
      const [cy, cx] = queue.shift();

      size++;
      columnSet.add(cx);

      for (let [dy, dx] of direction) {
        const [ny, nx] = [cy + dy, cx + dx];
        if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
        if (land[ny][nx] === 1 && !visited[ny][nx]) {
          queue.push([ny, nx]);
          visited[ny][nx] = true;
        }
      }
    }
    for (const column of columnSet) {
      oils[column] += size;
    }
  }

  return Math.max(...oils);
}
