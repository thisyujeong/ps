const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

const members = input.map((p) => {
  const member = p.split(' ');
  return { age: +member[0], name: member[1] };
});

members.sort((a, b) => {
  if (a.age === b.age) return 0;
  return a.age - b.age;
});

const result = members.map((p) => p.age + ' ' + p.name).join('\n');
console.log(result);
