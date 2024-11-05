const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const operator = input.map(Number);

class Heap {
  constructor() {
    this.heap = [];
  }
  empty() {
    return this.heap.length === 0;
  }
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(); // bubble up
  }
  delete() {
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(); // bubble down
    }
    return max;
  }
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);
    while (this.heap[currentIndex] > this.heap[parentIndex]) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }
  heapifyDown(index = 0) {
    let currentIndex = index;
    let leftChildIndex = currentIndex * 2 + 1;
    let rightChildIndex = currentIndex * 2 + 2;
    let nextIndex = currentIndex;

    if (this.heap[nextIndex] < this.heap[leftChildIndex]) {
      nextIndex = leftChildIndex;
    }
    if (this.heap[nextIndex] < this.heap[rightChildIndex]) {
      nextIndex = rightChildIndex;
    }
    if (nextIndex !== currentIndex) {
      this.swap(currentIndex, nextIndex);
      this.heapifyDown(nextIndex);
    }
  }
}

const answer = [];
const heap = new Heap();
for (let i = 0; i < N; i++) {
  let x = operator[i];
  if (x === 0) {
    answer.push(heap.empty() ? 0 : heap.delete());
    continue;
  }
  heap.insert(x);
}

console.log(answer.join('\n'));
