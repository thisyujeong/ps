/**
 * 문제에서 주어지는 수의 길이가 1,000,000을 넘지 않는다고 한다.
 * 8진수 표현할 수 있는 수의 가장 큰 수는 7이다. (3비트)
 * 따라서 1,000,000 를 넘지 않도록 주어진 수를 3개씩 조개어 8진수로 변화한다.
 *
 * 1차시도) 길이 제한을 고려하지 않고
 * parseInt(input, 2).toString(8); 만 사용해서 오답처리
 *
 * 2차시도) 성공
 */
let input = require('fs').readFileSync('./input.txt').toString().trim();
let result = '';

while (input.length >= 3) {
  result = parseInt(input.slice(input.length - 3), 2).toString(8) + result;
  input = input.slice(0, input.length - 3);
}
result = input.length ? parseInt(input, 2).toString(8) + result : result;
console.log(result);

/**
 * 다른 사람 풀이 분석
 * 배열을 이용하여 글자 수 대로 while 반복문을 실행함
 * 배열의 뒤에서부터 3번(3비트이므로) pop하여 8진법으로 변환
 * 나의 풀이(316ms)로 비교했을 때 속도가 크게 단축됨 (320ms -> 280ms)
 * 하지만 메모리는 소모량은 늘어남 (36744kb -> 43328kb)
 */
var s = require('fs').readFileSync('./input.txt').toString().trim().split('');
var a = '';

while (s.length > 0) {
  var k = s.pop();
  k = (s.length > 0 ? s.pop() : '') + k;
  k = (s.length > 0 ? s.pop() : '') + k;
  a = parseInt(k, 2).toString(8) + a;
}
console.log(a);
