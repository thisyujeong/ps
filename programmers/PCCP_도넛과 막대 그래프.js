// 막대그래프: 그래프를 이동하다 보면, 더이상 갈 곳이 없는 정점이 존재하는 것(단방향)
// 도넛그래프: 순환 그래프. 같은 정점을 재방문하게 되었을 때, 그 정점이 시작과 같다면 도넛 (단방향)
// 8자그래프: 순환 그래프가 2개 존재, 중점이 되는 정점에서 2가지의 방향으로 가는 간선을 갖고있음
// 정점: 특정 정점에서 진입하는 간선이 존재하고, 중점으로 부터 나가는 간선이 2개이상이라면 중심정점

// 최초 정점에서 뻗힌 간선의 수 = 그래프의 총 개수

function solution(edges) {
  const answer = [0, 0, 0, 0]; // 정점, 도넛, 막대, 8자

  let len = 0; // 정점의 총 개수
  for (const edge of edges) {
    len = Math.max(len, Math.max(...edge));
  }

  const out_edges = Array.from({ length: len + 1 }, () => 0); // 임의의 정점에서 나가는 간선 수
  const in_edges = Array.from({ length: len + 1 }, () => 0); // 임의의 정점에서 들어오는 간선 수
  for (const [from, to] of edges) {
    out_edges[from] += 1;
    in_edges[to] += 1;
  }

  for (let i = 1; i <= len; i++) {
    // 막대그래프: 들어오는 간선이 1개 이상, 나가는 간선 0개인 정점
    if (in_edges[i] >= 1 && out_edges[i] == 0) {
      answer[2] += 1;
    }
    // 8자그래프: 들어오는 간선과 나가는 간선이 2개 이상
    else if (in_edges[i] >= 2 && out_edges[i] >= 2) {
      answer[3] += 1;
    }
    // 정점: 들어오는 간선이 0개이고 나가는 간선이 2개 이상
    else if (in_edges[i] == 0 && out_edges[i] >= 2) {
      answer[0] = i;
    }
  }

  // 도넛그래프: 최초 정점에서 뻗은 간선의 수(총 그래프 수) - 막대그래프 수 - 8자 그래프 수
  answer[1] = out_edges[answer[0]] - answer[2] - answer[3];
  return answer;
}
