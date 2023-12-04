const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [a, p] = input.map(Number);
const array = [];

function calculator(num) {
  // num이 array 배열에 포함되는 순간부터 반복이 시작되므로
  // 재귀함수를 중단하고 이전의 값까지 배열을 자름
  if (array.includes(num)) {
    array.splice(array.indexOf(num));
    return;
  }
  const curr = num.toString().split('').map(Number); // 현재 인덱스의 값
  const next = curr.reduce((acc, cur) => acc + Math.pow(cur, p), 0); // 다음 값 계산

  array.push(num); // array 배열에 포함되지 않았으므로 push
  calculator(next); // 반복되는 수가 나올 때까지 반복(재귀)
}

calculator(a);
console.log(array.length);
