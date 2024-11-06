class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  size() {
    return this.length;
  }
  empty() {
    return this.length === 0;
  }
  peek() {
    if (this.length === 0) return null;
    return this.head.value;
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }
  dequeue() {
    if (this.length === 0) throw new Error('Empty queue');

    const pop = this.head.value;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return pop;
  }
}
