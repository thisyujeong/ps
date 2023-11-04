const fs = require('fs');
const [N, ...array] = fs.readFileSync('./input.txt').toString().split('\n').map(Number);

// JS 내장 함수 sort를 사용하여 가장 단순한 방식을 사용
// array.sort((a, b) => a - b);
// console.log(array.join('\n'));

/* 
  TODO: 정렬 알고리즘를 익히기 위해 정렬 알고리즘 직접 작성해볼 필요가 있음
  1. 퀵 정렬 (시간초과) - 최악의 경우 O(N^2)
  O(N^2)를 갖는 버블, 선택, 삽입 정렬 또한 시간초과 발생 
 */
function quickSort(arr, l, r) {
  const pivot = arr[Math.floor((l + r) / 2)];
  let left = l;
  let right = r;

  while (left <= right) {
    // left, right 포인터 이동
    while (arr[left] < pivot) left++;
    while (arr[right] > pivot) right--;

    if (left <= right) {
      // swap
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;

      // left, right 포인터 이동
      left++;
      right--;
    }
  }

  // 피봇을 기준으로 좌/우 부분배열에 대해 재귀함수 수행
  if (l < right) quickSort(arr, l, right);
  if (r > left) quickSort(arr, left, r);

  return arr;
}

const result = quickSort(array, 0, array.length - 1).join('\n');
console.log(result);

/* TODO: O(N log N) 이하의 복잡도를 갖는 정렬 알고리즘 사용 - 합병정렬, 힙 정렬 */
