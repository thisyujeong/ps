const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');

const ab = parseInt(input[0] + input[1]);
const cd = parseInt(input[2] + input[3]);

console.log(ab + cd);
