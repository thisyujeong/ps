const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

const coords = input.map((a) => {
  const coordinate = a.split(' ');
  return { x: +coordinate[0], y: +coordinate[1] };
});

coords.sort((a, b) => {
  if (a.x === b.x) return a.y - b.y;
  return a.x - b.x;
});

const result = coords.map((n) => `${n.x} ${n.y}`).join('\n');
console.log(result);

/* 반복문으로 출력할 경우 시간초과 발생
for (let i = 0; i < N; i++) {
  console.log(coords[i].join(' '));
} 
*/
