/**
 * 사이클을 이루는 그래프를 제외한 학생의 수를 구하는 문제
 * dfs 함수의 동작 부분 - 다른 풀이를 봐도 이해가 쉽지 않았음
 * TODO: 여러번 풀어보기
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

for (let i = 0; i < input.length; i += 2) {
  // 변수 초기화
  const n = +input[i];
  const array = input[i + 1].split(' ').map(Number);
  array.unshift(0);

  let visited = new Array(n + 1).fill(0);
  let done = new Array(n + 1).fill(0);
  let count = 0;

  // 각 노드 dfs 수행
  for (let i = 1; i < n + 1; i++) {
    dfs(array[i]);
  }

  // 사이클을 제외한 (팀을 제외한) 학생 수
  console.log(n - count);

  // dfs (깊이 우선 탐색)
  function dfs(node) {
    visited[node] = 1; // 현재 노드 방문 처리
    const next = array[node]; // 다음 노드

    // 다음 노드를 방문한적 없다면 다음 노드에 대하여 dfs 수행
    if (!visited[next]) dfs(next);
    // 방문 한 곳이지만 완료되지 않은 노드 (사이클이 된 경우)
    else if (!done[next]) {
      count++; // 자기 자신 카운트
      for (let i = next; i !== node; i = array[i]) {
        // 초기값, 조건, 매 반북 후 수행될 식
        // 자기자신 제외한, 사이클을 이루는 경로 상의 노드 수 카운트
        count++;
      }
    }
    done[node] = 1;
  }
}
