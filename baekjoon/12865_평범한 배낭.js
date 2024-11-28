/**
 * 배낭 문제로, 그리디 풀이가 가능할 줄 알았으나,
 * 물건을 쪼갤 수 없으므로 아예 물건을 빼야하는 경우를 해결할 수 없음
 *
 * 물건의 무게를 쪼갤 수 없다면? - DP 활용
 *
 * 예시) 물건개수 N = 4, 배낭 허용 무게 K = 7
 * 표를 만들어 n번째 물건을 탐색할 때 물건 무게의 합이 k 이하인 물건 조합들에 대하여 최대 가치를 탐색함
 *
 *  n \ k | 0  1  2  3  4  5  6  7 | 선택 가능한 물건
 * -------|------------------------|----------------------------------
 * [6,13] | 0  0  0  0  0  0 13 13 | (6, 13)
 *  [4,8] | 0  0  0  0  8  8 13 13 | (6, 13), (4, 8)
 *  [3,6] | 0  0  0  6  8  8 13 14 | (6, 13), (4, 8), (3, 6)
 * [5,12] | 0  0  0  6  8 12 13 14 | (6, 13), (4, 8), (3, 6), (5, 12)
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = input.shift().split(' ').map(Number); // N: 물품의 수, K: 버틸 수 있는 무게
const items = input.map((v) => v.split(' ').map(Number));

// n번까지의 물건들 중 합이 k 이하인 조합들의 가치 합 중 최댓값
const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));

for (let n = 1; n <= N; n++) {
  const [weight, value] = items[n - 1];
  for (let k = 1; k <= K; k++) {
    // 현재 물건이 지정된 무게를 초과한다면 이전 행의 같은 무게의 가치를 복사
    if (k < weight) {
      dp[n][k] = dp[n - 1][k];
    } else {
      dp[n][k] = Math.max(
        dp[n - 1][k], // 현재 물건을 담지 않을 때,
        dp[n - 1][k - weight] + value // 현재 물건을 담을 때
        // n번째 물건까지 탐색하면서 n-1번째까지의 물건들 중 어떠한 물건을 더 담을 수 있었다면,
        // n-1번째까지의 물건을 탐색할 때 dp[n-1][k - weight]에 이미 기록되어있을 것이다.
      );
    }
  }
}

console.log(dp[N][K]);

/**
 * 다른 풀이 분석
 * - 위 풀이의 경우 원소의 개수가 K + 1개로 이루어진 배열을 N개 활용하여 테이블을 생성하여 메모제이션했다면
 * - 해당 풀이에서는 원소개 K + 1개로 이루어진 배열을 1개만 활용하여 메모제이션한다.
 *   무게 k에 따라서 조합할 수 있는 최대 가치를 덮어씌우는 방식
 * - 위 풀이에서는 무게 1부터 K까지 모두 탐색했다면, 해당 풀이는 현재 물건의 무게부터 배낭 허용 무게(K)까지만 탐색하여 불필요한 연산을 줄임
 */
const memo = Array.from({ length: K + 1 }, () => 0);
for (let [weight, value] of items) {
  for (let k = K; k >= weight; k--) {
    if (memo[k] < memo[k - weight] + value) {
      memo[k] = memo[k - weight] + value;
    }
  }
}
console.log(Math.max(...memo));
