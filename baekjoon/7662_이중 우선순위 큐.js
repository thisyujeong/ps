// 테스트
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

class Heap {
  constructor(comp) {
    this.items = [];
    this.comp = comp;
  }

  get size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  swap(a, b) {
    const temp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = temp;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  peak() {
    return this.items[0];
  }

  add(item) {
    let index = this.items.push(item) - 1;
    let parentIndex = this.getParentIndex(index);

    while (parentIndex >= 0 && this.comp(this.items[index], this.items[parentIndex])) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  poll() {
    if (this.size < 2) return this.items.pop();

    const item = this.peak();
    this.items[0] = this.items.pop();

    let index = 0;
    let leftIndex = this.getLeftChildIndex(index);
    let rightIndex = this.getRightChildIndex(index);

    while (leftIndex < this.size) {
      const target =
        rightIndex < this.size && this.comp(this.items[rightIndex], this.items[leftIndex])
          ? rightIndex
          : leftIndex;

      if (this.comp(this.items[index], this.items[target])) break;
      this.swap(index, target);

      index = target;
      leftIndex = this.getLeftChildIndex(index);
      rightIndex = this.getRightChildIndex(index);
    }

    return item;
  }
}

const maxHeap = new Heap((a, b) => a > b);
const minHeap = new Heap((a, b) => a < b);
const map = new Map();

function trimHeap(heap) {
  while (heap.size > 0 && map.get(heap.peak()) === 0) {
    heap.poll();
  }
}

function print() {
  trimHeap(maxHeap);
  trimHeap(minHeap);
  if (maxHeap.size === 0) return 'EMPTY';

  const max = maxHeap.peak();
  const min = minHeap.peak();

  return `${max} ${min}`;
}

const ops = {
  I(num) {
    const cnt = map.get(num) ?? 0;
    map.set(num, cnt + 1);

    maxHeap.add(num);
    minHeap.add(num);
  },
  D(num) {
    const heap = num > 0 ? maxHeap : minHeap;
    trimHeap(heap);

    if (heap.size === 0) return;
    const cur = heap.poll();
    const cnt = map.get(cur);
    map.set(cur, cnt - 1);
  },
};

const t = +input[0];
const ans = [];

for (let i = 0, s = 1; i < t; i += 1) {
  const k = +input[s];
  const next = s + k + 1;

  maxHeap.clear();
  minHeap.clear();
  map.clear();

  for (let j = s + 1; j < next; j += 1) {
    const [op, param] = input[j].split(' ');
    ops[op](+param);
  }

  ans[ans.length] = print();
  s = next;
}

console.log(ans.join('\n'));
