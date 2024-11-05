/* 힙 구현 */
class Heap {
  /// 기본 골격
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
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
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], [this.heap[index1]]];
  }

  ////////////////////////////////// 최대 힙 //////////////////////////////////
  //// 삽입
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(); // heapify
  }

  //// 제거 및 추출
  // 힙의 추출 과정에서 루트 노드는 제거되고, 루트 노드가 마지막 노드로 대체된다
  // => 이동 후 힙의 원칙에 루트부터 마지막 노드까지 heapify, 즉 힙의 재구조화 과정이 필요
  delete() {
    const max = this.heap[0]; // 루트 노트가 최대 값을 가진다
    const last = this.heap.pop(); // 마지막 노드
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return max;
  }

  //// 버블 업 재구조화
  heapifyUp() {
    let currentIndex = this.heap.length - 1; // 현재 노드의 인덱스(마지막 노드)
    let parentIndex = this.getParentIndex(currentIndex); // 현재 노드의 부모 노드 인덱스

    // 현재 노드의 값이 부모 노드의 값보다 크다면(최대힙) 반복 실행
    while (this.heap[parentIndex] < this.heap[currentIndex]) {
      // 두 노드를 교체하고 인덱스도 업데이트
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  //// 버블 다운 재구조화
  heapifyDown(index = 0) {
    let currentIndex = index;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);
    let nextIndex = currentIndex;

    // 현재요소 < 좌측요소: 다음 인덱스를 좌측 자식 인덱스로 설정
    if (this.heap[nextIndex] < this.heap[leftChildIndex]) {
      nextIndex = leftChildIndex;
    }
    // 현재요소 < 우측요소: 다음 인덱스를 우측 자식 인덱스로 설정
    if (this.heap[nextIndex] < this.heap[rightChildIndex]) {
      nextIndex = rightChildIndex;
    }
    // 다음 인덱스 != 현재 인덱스:
    // 현재 요소와 다음 요소를 교환하고, 다음 인덱스를 기준으로 다시 heapifyDown 호출
    if (nextIndex !== currentIndex) {
      this.swap(currentIndex, nextIndex);
      this.heapifyDown(nextIndex); // 재귀 실행
    }
  }

  ////////////////////////////////// 최소 힙 //////////////////////////////////
  //// 버블 업 재구조화
  heapifyUp() {
    let currentIndex = this.heap.length - 1; // 현재 노드의 인덱스(마지막 노드)
    let parentIndex = this.getParentIndex(currentIndex); // 현재 노드의 부모 노드 인덱스

    // 현재 노드의 값이 부모 노드의 값보다 작다면(최소힙) 반복 실행
    while (this.heap[parentIndex] > this.heap[currentIndex]) {
      // 두 노드를 교체하고 인덱스도 업데이트
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  //// 버블 다운 재구조화
  heapifyDown(index = 0) {
    let currentIndex = index;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);
    let nextIndex = currentIndex;

    // 현재요소 > 좌측요소: 다음 인덱스를 좌측 자식 인덱스로 설정
    if (this.heap[nextIndex] > this.heap[leftChildIndex]) {
      nextIndex = leftChildIndex;
    }
    // 현재요소 > 우측요소: 다음 인덱스를 우측 자식 인덱스로 설정
    if (this.heap[nextIndex] > this.heap[rightChildIndex]) {
      nextIndex = rightChildIndex;
    }
    // 다음 인덱스 != 현재 인덱스:
    // 현재 요소와 다음 요소를 교환하고, 다음 인덱스를 기준으로 다시 heapifyDown 호출
    if (nextIndex !== currentIndex) {
      this.swap(currentIndex, nextIndex);
      this.heapifyDown(nextIndex); // 재귀 실행
    }
  }
}
