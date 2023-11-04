/** 11650 좌표정렬하기 문제와 유사 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

const coords = input.map((a) => {
  const coordinate = a.split(' ');
  return { x: +coordinate[0], y: +coordinate[1] };
});

coords.sort((a, b) => {
  if (a.y === b.y) return a.x - b.x;
  return a.y - b.y;
});

const result = coords.map((n) => `${n.x} ${n.y}`).join('\n');
console.log(result);
