const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const array = input[1].split(' ').map(Number);

/* 풀이 1 - sort 함수 (메모리 563480kb, 시간 4596ms)  */
// console.log(array.sort((a, b) => a - b)[K - 1]);

/* 풀이 2 - 퀵 정렬 (메모리 489172kb, 시간 3032ms) */
function quickSort(arr, l, r) {
  if (l >= r) return;
  const pivot = arr[Math.floor((l + r) / 2)];
  let left = l;
  let right = r;

  while (left <= right) {
    while (arr[left] < pivot) left++;
    while (arr[right] > pivot) right--;

    if (left <= right) {
      const tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;

      left++;
      right--;
    }
  }

  if (l < right) quickSort(arr, l, right);
  if (r > left) quickSort(arr, left, r);

  return arr;
}

console.log(quickSort(array, 0, N - 1)[K - 1]);

/* 풀이 3 - 합병 정렬 (메모리 524780kb, 시간 3352ms)*/
const tmpArray = new Array(N);
function mergeSort(arr, tmp, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSort(arr, tmp, start, mid);
    mergeSort(arr, tmp, mid + 1, end);

    merge(arr, tmp, start, mid, end);
  }

  return arr;
}
function merge(arr, tmp, start, mid, end) {
  for (let i = start; i <= end; i++) {
    tmp[i] = arr[i];
  }

  let left = start;
  let right = mid + 1;
  let index = start;

  while (left <= mid && right <= end) {
    if (tmp[left] <= tmp[right]) {
      arr[index] = tmp[left];
      left++;
    } else {
      arr[index] = tmp[right];
      right++;
    }
    index++;
  }

  for (let i = 0; i <= mid - left; i++) {
    arr[index + i] = tmp[left + i];
  }
}

console.log(mergeSort(array, tmpArray, 0, N - 1)[K - 1]);

/* 풀이 4 - 힙 정렬 (메모리 526016, 시간 4960ms) */
function heapSort(heap) {
  // 먼저 전체 트리 구조를 최대 힙 구조로 바꿈
  for (let i = 1; i < heap.length; i++) {
    let curr = i;
    while (curr > 0) {
      let root = Math.floor((curr - 1) / 2); // 부모노드 찾기
      if (heap[root] < heap[curr]) {
        let tmp = heap[root];
        heap[root] = heap[curr];
        heap[curr] = tmp;
      }
      curr = root;
    }
  }

  // 크기를 줄여가며 반복적으로 힙을 구성
  for (let i = heap.length - 1; i >= 0; i--) {
    // 루트 노드(가장 큰 값)와 가장 마지막에 위치한 원소의자리를 교체
    // => 자연스럽게 오름차순 정렬이 이루어짐
    let tmp = heap[0];
    heap[0] = heap[i];
    heap[i] = tmp;

    let root = 0;
    let curr = 1;

    while (curr < i) {
      curr = 2 * root + 1; // 자식 노드 (왼쪽 자식 노드)

      // 자식 중 더 큰 값 찾기 (오른쪽 값이 더 크다면 heap[curr + 1])
      if (heap[curr] < heap[curr + 1] && curr < i - 1) {
        curr++;
      }
      // 루트보다 자식이 더 크다면 교환
      if (heap[root] < heap[curr] && curr < i) {
        let tmp = heap[root];
        heap[root] = heap[curr];
        heap[curr] = tmp;
      }

      root = curr;
    }
  }
  return heap;
}

console.log(heapSort(array)[K - 1]);
