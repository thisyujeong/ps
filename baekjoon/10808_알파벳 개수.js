const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const count = new Array(26).fill(0);

input.forEach((a) => count[alphabet.indexOf(a)]++);
console.log(count.join(' '));
