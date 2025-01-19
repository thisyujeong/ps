// 풀이 시간 15분 - 난이도 bfs 알고리즘만 알면 매우 쉬운 문제
function solution(maps) {
  const answer = [];

  const h = maps.length;
  const w = maps[0].length;
  const visited = Array.from({ length: h }, () => new Array(w).fill(false));
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  maps = maps.map((r) => r.split('').map((v) => (v !== 'X' ? +v : v)));

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (maps[i][j] !== 'X' && !visited[i][j]) {
        answer.push(bfs(i, j));
      }
    }
  }

  function bfs(r, c) {
    const queue = [[r, c]];
    let head = 0;
    let day = maps[r][c];

    visited[r][c] = true;

    while (head < queue.length) {
      const [cur_r, cur_c] = queue[head++];

      for (const [dr, dc] of directions) {
        const [nr, nc] = [cur_r + dr, cur_c + dc];

        if (isValid(nr, nc) && !visited[nr][nc]) {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
          day += maps[nr][nc];
        }
      }
    }

    return day;
  }

  function isValid(r, c) {
    return r >= 0 && c >= 0 && r < h && c < w && maps[r][c] !== 'X';
  }

  // 첫 제출 시 오답처리된 이유
  // 섬이 있을 경우 answer.sort()를 사용하여 정렬된 값을 리턴했으나,
  // 자바스크립트의 sort는 문자열을 기준으로 정렬하기 때문에 a, b 의 값을 비교하여 반환해야한다.
  return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1];
}
