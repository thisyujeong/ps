/**
 * 최소 힙, 우선순위 큐(절대값이 가장 작은 순)
 *
 * 클래스를 활용하는 이유:
 * - 힙과 관련된 모든 메서드를 포함하고 있어 힙의 동작을 명확하기 이해하고 유지할 수 있다.
 * - 코드의 모듈화를 돕고, 객체 지향 프로그래밍의 장점을 활용할 수 있게 한다.
 * - 함수 기반 접근법은 더 간단하고 직접적일 수 있지만, 관련 데이터와 동작을 명시적으로 묶지 않는다.
 * - 이는 코드의 가독성이나 유지보수성에서 차이를 만들 수 있다.
 *
 * 메소드/변수명 앞에 언더바(_)를 붙이는 이유:
 * - 해당 함수나 변수가 프라이빗 또는 내부용도로 사용한다는 암묵적인 의미
 * - 자바스크립트에서는 프라이빗 멤버를 지원하지 않기 때문에 언더바를 명시함
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift(); // 연산의 개수, 1 ≤ N ≤ 100,000
const operators = input.map(Number);

class Heap {
  constructor() {
    this.heap = [];
  }
  _swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  _compare(a, b) {
    if (Math.abs(a) < Math.abs(b)) return true; // a의 절댓값이 더 작다면 true
    else if (Math.abs(a) === Math.abs(b) && a < b) return true; // a와 b의 절댓값이 같고, a가 더 작다면 true
    return false;
  }
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  pop() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      this.heap[parentIndex] &&
      this._compare(this.heap[currentIndex], this.heap[parentIndex])
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }
  heapifyDown() {
    let current = 0;
    let length = this.heap.length;

    while (true) {
      let leftChildIndex = current * 2 + 1;
      let rightChildIndex = current * 2 + 2;
      let swapIndex = null;

      if (leftChildIndex < length) {
        if (this._compare(this.heap[leftChildIndex], this.heap[current])) {
          swapIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        if (
          (swapIndex === null &&
            this._(this.heap[rightChildIndex], this.heap[current])) ||
          (swapIndex !== null &&
            this._compare(this.heap[rightChildIndex], this.heap[swapIndex]))
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      this.swap(current, swapIndex);
      current = swapIndex;
    }
  }
}

const answer = [];
const heap = new Heap();
for (let i = 0; i < N; i++) {
  const x = operators[i];
  if (x !== 0) heap.push(x);
  else answer.push(heap.pop());
}

console.log(answer.join('\n'));
