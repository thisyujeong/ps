const n = +require('fs').readFileSync('./input.txt').toString().trim();

function solution1(n) {
  for (let i = 0; i < n; i++) {
    const str = i.toString();
    let sum = 0;
    for (let j = 0; j < str.length; j++) {
      sum += parseInt(str[j]);
    }
    if (sum + i === n) return i;
  }
  return 0;
}

/**
 * 다른 풀이 분석
 * - 런타임 시간 단축
 */
function solution2(n) {
  // 각 자리 수의 합으로 나올 수 있는 최대 값은 자리수 * 9 이므로 0부터 순회할 필요 없이
  // n - (각 자리수의 합 최대값) 부터 반복문을 실행한다.
  let start = n - String(n).length * 9;
  for (let i = start; i <= n; i++) {
    const sum = i + [...String(i)].reduce((acc, cur) => acc + +cur, 0);
    if (sum === n) return i;
  }
  return 0;
}

console.log(solution1(n));
