// ABDCEFG
// DBAECFG
// DBEGFCA

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

const tree = {};
let result = '';

// 트리 구성
input.forEach((line) => {
  const [parent, left, right] = line.split(' ');
  tree[parent] = { left, right };
});

// 전위 순회
function preOrder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  result += node;
  preOrder(left);
  preOrder(right);
}

// 중위 순회
function inOrder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  inOrder(left);
  result += node;
  inOrder(right);
}

// 후위 순회
function postOrder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  postOrder(left);
  postOrder(right);
  result += node;
}

preOrder('A');
result += '\n';
inOrder('A');
result += '\n';
postOrder('A');

console.log(result);
