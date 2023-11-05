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

/* TODO: 풀이 4 - 힙 정렬 */
