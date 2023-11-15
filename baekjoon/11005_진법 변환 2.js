const input = require('fs').readFileSync('./input.txt').toString().trim();
const [n, b] = input.split(' ').map(Number);

console.log(n.toString(b).toUpperCase());
