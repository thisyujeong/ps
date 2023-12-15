const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const tree = Array.from({ length: n + 1 }, () => new Array()); // 트리 구성을 위한 배열
const visited = new Array(n + 1).fill(0); // 노드 방문 기록
const parentNodes = new Array(n + 1).fill(0); // 각 노드의 부모들
let result = '';

// 무방향 트리 구성
input.forEach((line) => {
  const [from, to] = line.split(' ').map(Number);
  tree[from].push(to);
  tree[to].push(from);
});

// dfs를 활용하여 부모 노드 찾기
function dfsForParentNode(node) {
  // 방문한 적 있는 노드라면 재귀 종료
  if (visited[node]) return;

  // 방문한 적 없는 노드라면 해당 노드 방문처리
  visited[node] = 1;

  for (let i = 0; i < tree[node].length; i++) {
    // 다음 노드(현재 노드의 자식 노드)
    const child = tree[node][i];

    // 다음 노드(자식)의 부모는 현재 노드이므로
    // parentNodes 의 child 번째 원소로 현재 노드 할당
    if (!visited[child]) parentNodes[child] = node;
    dfsForParentNode(child);
  }
}

dfsForParentNode(1);

for (let i = 2; i < parentNodes.length; i++) {
  result += parentNodes[i] + '\n';
}

console.log(result);
