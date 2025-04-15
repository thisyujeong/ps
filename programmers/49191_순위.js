/* 
입력: n 명의 선수가 있고, 이긴/진 결과가 주어진다. 일부 정보는 주어지지 않음.

로직: 핵심 키워드 - 직접 대결하지 않은 선수 간에도 간접적으로 승패를 알 수 있다면 순위를 매길 수 있다
    1. 모든 쌍(i, j)간의 관계를 파악해야 한다.
      - A가 B를 이기고, B가 C를 이겼다면 -> A는 C보다 강함
      - 즉, "간접적인 관계추론"이 필요함 -> 이런 문제는 그래프 탐색으로 해결
    2. 한 번에 모든 쌍을 구해야한다.
      - A -> B -> C -> D ... 다수의 중간 관계를 거쳐 연결될 수 있다
      - 특정 노드에서 시작하는 단순 DFS/BFS로는 모든 노드 쌍을 한 번에 갱신하기 어려움
      - 결과가 부분적으로 주어지고, "전체"를 유추해야함
      - 직접 대결한 정보만 있고, 나머진 간접 추론? -> 직접적인 경로뿐만 아니라 간접 경로도 필요하겠네.
      => 이럴때 사용하는 대표적인 알고리즘이 플로이드 워샬 알고리즘

    플로이드 워샬 알고리즘
    - 모든 정점 쌍 간의 경로 유무, 최단거리, 연결 여부 등을 구할 때
    - 간접 관계를 빠짐없이 구할 수 있음

    시간 복잡도 O(n^3)
    n: 최대 100명, n^3: 1,000,000

출력: 명확하게 순위를 알 수 있는 선수 수

*/

function solution(n, results) {
  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  // 주어진 결과를 그래프에 저장. 1: 이김, -1: 짐
  for (const [winner, loser] of results) {
    graph[winner][loser] = 1;
    graph[loser][winner] = -1;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (graph[i][k] === 1 && graph[k][j] === 1) graph[i][j] = 1;
        if (graph[i][k] === -1 && graph[k][j] === -1) graph[i][j] = -1;
      }
    }
  }

  // 경기 결과를 예측할 수 있는 경우 그대로 0
  // 각 선수에 대하여 0이전혀 없는 경우 count+1
  let count = 0;
  for (let i = 1; i <= n; i++) {
    let unknown = false;
    for (let j = 1; j <= n; j++) {
      if (i === j) continue;
      if (graph[i][j] === 0) {
        unknown = true;
        break;
      }
    }
    console.log(unknown, i);
    count += unknown ? 0 : 1;
  }

  console.log(count);
  return count;
}

solution(5, [
  [4, 3],
  [4, 2],
  [3, 2],
  [1, 2],
  [2, 5],
]);
