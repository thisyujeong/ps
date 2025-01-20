// m가로, n세로
// 시간 초과, 효율성 실패로 40분 걸림
const mod = 1000000007;
function solution(m, n, puddles) {
  const map = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  // 물에 잠긴 지역
  puddles.forEach(([x, y]) => {
    map[y][x] = -1;
  });

  map[1][1] = 1;

  for (let y = 1; y <= n; y++) {
    for (let x = 1; x <= m; x++) {
      if (map[y][x] === -1) continue;
      // left
      if (map[y][x - 1] !== -1 && x - 1 > 0) {
        map[y][x] += map[y][x - 1] % mod;
      }
      // top
      if (map[y - 1][x] !== -1 && y - 1 > 0) {
        map[y][x] += map[y - 1][x] % mod;
      }
    }
  }

  return map[n][m] % mod;
}
