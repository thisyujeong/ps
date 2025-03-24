// 그래프, 플로이드 와샬 문제
// https://dev-musa.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-Level-3-%EC%88%9C%EC%9C%84
function solution(n, results) {
  let answer = n;
  const table = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === c ? 0 : null)));

  for (let [a, b] of results) {
    table[a - 1][b - 1] = 1; // a 선수가 이긴 경우
    table[b - 1][a - 1] = -1; // a 선수가 진 경우
  }

  // k: 거쳐가는 정점, i: 출발 정점, j: 도착정점
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // i가 k를 이기고, k가 j를 이긴다면 (k를 거쳐감)
        if (table[i][k] === 1 && table[k][j] === 1) {
          table[i][j] = 1;
          table[j][i] = -1;
        }
      }
    }
  }

  // 전체 선수에서 순위를 매길 수 없는 선수 수만큼 뺌
  table.forEach((r) => {
    if (r.includes(null)) answer--;
  });

  return answer;
}
