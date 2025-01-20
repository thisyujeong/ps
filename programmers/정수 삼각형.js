// 풀이 시간 10분 - dp 풀이
function solution(triangle) {
  const len = triangle.length;

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      const left = triangle[i - 1][j - 1] || 0;
      const right = triangle[i - 1][j] || 0;
      const value = triangle[i][j];
      triangle[i][j] = Math.max(left + value, right + value);
    }
  }

  return Math.max(...triangle[len - 1]);
}

// 다른 사람 풀이 reduce 활용
function solution(triangle) {
  return Math.max(
    ...triangle.reduce((cost, line) => {
      return line.map((v, index) => {
        return (
          v +
          Math.max(index < cost.length ? cost[index] : 0, index > 0 ? cost[index - 1] : 0)
        );
      });
    }, [])
  );
}
