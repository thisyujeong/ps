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

// 효율성 테스트 - 시간초과 풀이
function solution(triangle) {
  const len = triangle.length;
  const memo = Array.from({ length: len }, (_, i) =>
    Array.from({ length: i + 1 }, () => 0)
  );

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      const left = Math.max(memo[i + 1][j], memo[i][j] + triangle[i + 1][j]);
      const right = Math.max(memo[i + 1][j + 1], memo[i][j] + triangle[i + 1][j + 1]);

      memo[i + 1][j] = left;
      memo[i + 1][j + 1] = right;
    }
  }

  return Math.max(...memo[len - 1]);
}
