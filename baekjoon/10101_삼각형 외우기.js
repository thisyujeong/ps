/* 250327 (1day, 10m) */

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

const solve = () => {
  const angles = input.map(Number);
  const sum = angles.reduce((prev, cur) => prev + cur, 0);

  if (sum !== 180) return 'Error';

  let deduplication = new Set(angles).size;

  if (deduplication.size === 1) return 'Equilateral';
  if (deduplication.size === 2) return 'Isosceles';
  if (deduplication.size === 3) return 'Scalene';
};

const answer = solve();
console.log(answer);
