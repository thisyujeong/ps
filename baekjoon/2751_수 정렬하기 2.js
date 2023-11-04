/**
 * ⚠️ JS 내장 함수 sort를 사용하여 가장 단순한 방식을 사용함
 * TODO: 내장 함수를 사용하지 않고 정렬 알고리즘을 작성해볼 필요가 있음
 */
const fs = require('fs');
const [N, ...input] = fs.readFileSync('./input.txt').toString().split('\n').map(Number);
input.sort((a, b) => a - b);
console.log(input.join('\n'));

// TODO
