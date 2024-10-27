const n = +require('fs').readFileSync('./input.txt').toString().trim();

/**
 * 풀이 1 (시간초과) - Queue Array list 구현
 * - shift O(n), push O(1)
 * - shift: 첫번째 원소가 제거되면서 나머지 원소들이 한 칸씩 앞으로 쉬프트됨 - 시간초과
 * 추가와 삭제가 반복되는 로직이라면 Array list는 적합하지 않음
 */
const queue = Array.from({ length: n }, (v, i) => i + 1);
function solution() {
  while (queue.length > 1) {
    queue.shift();
    queue.push(queue.shift());
  }
  return queue[0];
}
console.log(solution());

/**
 * 풀이 2 - Queue Linked list 구현
 * - 탐색: O(n), 요소 추가 및 제거: O(1)
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.length++;
    return newNode;
  }
  remove() {
    this.head = this.head.next;
    this.head.prev = null;
    this.length--;
  }
  getHead() {
    return this.head.value;
  }
  getSize() {
    return this.length;
  }
}

const list = new LinkedList();

for (let i = 0; i < n; i++) {
  list.push(i + 1);
}

while (list.length > 1) {
  list.remove();
  list.push(list.getHead());
  list.remove();
}

console.log(list.getHead());
