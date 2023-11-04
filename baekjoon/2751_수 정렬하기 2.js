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

const quickResult = quickSort(array, 0, array.length - 1).join('\n');
console.log(quickResult);

/* 
  TODO: O(N log N) 이하의 복잡도를 갖는 정렬 알고리즘 사용(합병정렬, 힙 정렬) 
  2. 합병 정렬
*/
const tmpArray = new Array(array.length); // 병합 정렬은 임시 저장소를 필요로 함.

function mergeSort(arr, tmp, start, end) {
  // start 가 end보다 작을 경우에만 수행
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    // 가운데를 기준으로 좌우 부분배열 분할
    mergeSort(arr, tmp, start, mid);
    mergeSort(arr, tmp, mid + 1, end);

    // 분할된 두 부분배열 병합
    merge(arr, tmp, start, mid, end);
  }

  return arr;
}

function merge(arr, tmp, start, mid, end) {
  // 임시 저장소에 정렬된 배열을 복사
  for (let i = start; i <= end; i++) {
    tmp[i] = arr[i];
  }
  let left = start; // 왼쪽 부분배열의 첫번째 인덱스
  let right = mid + 1; // 오른쪽 부분배열의 첫번째 인덱스
  let index = start; // 정렬될 위치

  // 왼쪽 부분배열의 현재 인덱스와
  // 오른쪽 부분배열의 현재 인덱스를 비교하여 작은 작은 값부터 정렬
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
  // 왼쪽 배열에 데이터가 남아있을 경우
  // 왼쪽 배열이 남은 만큼 반복문을 돌면서 배열의 끝에 병합
  for (let i = 0; i <= mid - left; i++) {
    arr[index + i] = tmp[left + i];
  }
}

const mergeResult = mergeSort(array, tmpArray, 0, array.length - 1).join('\n');
console.log(mergeResult);
