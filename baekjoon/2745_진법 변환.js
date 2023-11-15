const input = require('fs').readFileSync('./input.txt').toString().trim();
const [n, b] = input.split(' ');
console.log(parseInt(n, b));
