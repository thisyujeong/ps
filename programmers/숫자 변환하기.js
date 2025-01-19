function solution(x, y, n) {
  let dp = new Array(y + 1).fill(Infinity);
  dp[x] = 0;

  if (x === y) return 0;

  for (let i = x; i <= y; i++) {
    if (i - n >= x) dp[i] = Math.min(dp[i], dp[i - n] + 1);
    if (i % 2 === 0 && i / 2 >= x) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0 && i / 2 >= x) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }

  return dp[y] === Infinity ? -1 : dp[y];
}

/* 다른 사람 풀이 */
// bfs 알고리즘 사용
function solution(x, y, n) {
  if (x === y) return 0;
  const dp = {};
  dp[x] = 0;
  let data = [x];
  while (data.length) {
    const newData = [];
    for (const d of data) {
      for (const e of [d + n, d * 2, d * 3]) {
        if (e > y || dp[e]) continue;
        if (e === y) return dp[d] + 1;
        dp[e] = dp[d] + 1;
        newData.push(e);
      }
    }
    data = newData;
  }
  return -1;
}
