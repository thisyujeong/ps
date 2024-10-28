const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift(); // 2 ≤ N ≤ 50
const people = input.map((v) => {
  const [h, w] = v.split(' ');
  return { height: +h, weight: +w };
});

const result = [];

for (let i = 0; i < N; i++) {
  const curr = people[i];
  const more = people.filter((v) => curr.weight < v.weight && curr.height < v.height);
  result.push(more.length + 1);
}

console.log(result.join(' '));
