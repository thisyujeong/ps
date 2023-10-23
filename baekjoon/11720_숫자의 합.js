const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

// const answer = input[1].split('').reduce((acc, n) => acc + parseInt(n), 0);
const answer = input[1].split('').reduce((acc, n) => acc + +n, 0);
console.log(answer);
