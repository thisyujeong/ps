const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const words = [...new Set(input)].sort(); // 중복제거, 사전순 정렬
words.sort((a, b) => a.length - b.length); // 길이순 정렬
console.log(words.join('\n'));
