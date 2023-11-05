/**
 * 언어제한 문제로 제출하지 못함
 * 오름차순 정렬하기 - 병합 정렬
 */
const fs = require('fs');
const array = fs.readFileSync('./input.txt').toString().split('\n').map(Number);
const N = array.shift();

const tmpArray = new Array(N);

function mergeSort(arr, tmp, start, end) {
  // start 지점이 end 보다 작을 경우에만 수행
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    // 배열을 가운데를 기준으로 왼쪽, 오른쪽 부분 배열로 분할
    mergeSort(arr, tmp, start, mid);
    mergeSort(arr, tmp, mid + 1, end);
    // 병합
    merge(arr, tmp, start, mid, end);
  }

  return arr;
}

function merge(arr, tmp, start, mid, end) {
  // 임시저장소 배열 tmp에 arr 복사
  for (let i = start; i <= end; i++) {
    tmp[i] = arr[i];
  }

  let left = start; // 왼쪽 부분배열의 인덱스
  let right = mid + 1; // 오른쪽 부분배열의 인덱스
  let index = start; // 현재 인덱스

  // 정렬하면서 병합
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

  // 왼쪽 부분배열에 아직 정렬되지 않은 원소가 남아있을 경우 arr에 이어붙임
  for (let i = 0; i <= mid - left; i++) {
    arr[index + i] = tmp[left + i];
  }
}

console.log(mergeSort(array, tmpArray, 0, N - 1));
