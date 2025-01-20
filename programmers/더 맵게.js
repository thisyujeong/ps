// 풀이 시간 21분 최소 힙
class MinHeap {
  constructor() {
    this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
  get peek() {
    return this.heap[0];
  }
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(); // heapify
  }
  delete() {
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return root;
  }
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (this.heap[currentIndex] < this.heap[parentIndex]) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }
  heapifyDown(index = 0) {
    let currentIndex = index;
    let leftChildIndex = currentIndex * 2 + 1;
    let rightChildIndex = currentIndex * 2 + 2;
    let swapIndex = currentIndex;
    let len = this.heap.length;

    if (leftChildIndex < len) {
      if (this.heap[swapIndex] > this.heap[leftChildIndex]) {
        swapIndex = leftChildIndex;
      }
    }

    if (rightChildIndex < len) {
      if (this.heap[swapIndex] > this.heap[rightChildIndex]) {
        swapIndex = rightChildIndex;
      }
    }

    if (swapIndex !== currentIndex) {
      this.swap(currentIndex, swapIndex);
      this.heapifyDown(swapIndex);
    }
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.sort((a, b) => a - b);
  scoville.forEach((s) => heap.insert(s));

  for (let i = 0; i < scoville.length - 1; i++) {
    if (heap.peek >= K) {
      return scoville.length - heap.size;
    }
    const score = heap.delete() + heap.delete() * 2;
    heap.insert(score);
  }

  if (heap.peek < K) return -1;

  return scoville.length - 1;
}
