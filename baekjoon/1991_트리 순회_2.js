const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const arr = input.map((v) => v.split(' '));
const tree = {};
let result = '';

// 트리 구성
for (let [p, l, r] of arr) {
  tree[p] = { left: l, right: r };
}

// 전위순회
function preorder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  result += node;
  preorder(left);
  preorder(right);
}

// 중위순위
function inorder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  inorder(left);
  result += node;
  inorder(right);
}

// 후위순회
function postorder(node) {
  if (node === '.') return;
  const { left, right } = tree[node];
  postorder(left);
  postorder(right);
  result += node;
}

preorder('A');
result += '\n';
inorder('A');
result += '\n';
postorder('A');

console.log(result);
