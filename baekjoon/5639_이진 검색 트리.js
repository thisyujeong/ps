const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const data = input.map(Number);

/* 풀이 1 - class 노드 구성, 재귀 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert(value) {
    // 추가된 노드가 현재 노드의 값보다 작다면 왼쪽 자식 노드로 추가
    if (value < this.value) {
      if (!this.left) this.left = new Node(value);
      else this.left.insert(value);
    }
    // 추가된 노드가 현재 노드의 값보다 크다면 오른쪽 자식 노드로 추가
    if (value > this.value) {
      if (!this.right) this.right = new Node(value);
      else this.right.insert(value);
    }
  }
}

// 후위순회(left - right - root)
function postOrder(node) {
  if (node.left) postOrder(node.left);
  if (node.right) postOrder(node.right);
  console.log(node.value);
}

function solution(data) {
  // 전위 순회는 첫번째 노드가 루트 노드가 됨
  const root = new Node(data[0]);
  // 루트 노드부터 이진 검색트리를 만족하도록 트리를 구성
  for (let i = 1; i < data.length; i++) {
    root.insert(data[i]);
  }
  // 트리 구성이 완료된 후, 후위순회
  postOrder(root);
}

solution(data);

/* 다른 풀이 분석 - 스택, 재귀 - 훨씬 빠름 */
const stack = [];
const result = [];

// 전위순회 결과 배열의 시작, 끝 인덱스 삽입
stack.push([0, input.length - 1]);

while (stack.length) {
  const [start, end] = stack.pop();
  if (start > end) continue; // start 인덱스가 end 인덱스보다 커지면 중단

  // 전위 순회 결과를 단서로 트리 구조 (루트, 오른쪽 서브트리, 왼쪽 서브트리) 분해 반복한다.
  // 루트 보다 작은 수들은 루트의 왼쪽 서브트리, 루트 보다 큰 노드들은 루트의 오른쪽 서브트리
  // 주어진 전위순회 결과 루트보다 큰 노드들 중 첫번째에 위치한 노드가 오른쪽 서브트리의 루트 노드가 됨
  let rightRoot;
  for (let i = start + 1; i <= end; i++) {
    if (data[i] < data[start]) continue;
    rightRoot = i;
    break;
  }

  // 오른쪽 서브 트리가 있다면(오른쪽 서브 트리가 없을 수 있음)
  if (rightRoot) {
    stack.push([start + 1, rightRoot - 1]); // 왼쪽 서브트리의 루트노드, 끝 노드 인덱스
    stack.push([rightRoot, end]); // 오른쪽 서브트리의 루트 노드, 끝 노드 인덱스
  } else {
    stack.push([start + 1, end]);
  }

  // result 배열의 처음에 루트 삽입
  result.unshift(data[start]);
}

console.log(result.join('\n'));
