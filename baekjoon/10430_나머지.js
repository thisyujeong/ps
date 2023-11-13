const fs = require('fs');
const [a, b, c] = fs.readFileSync('./input.txt').toString().trim().split(' ').map(Number);
const math = [(a + b) % c, ((a % c) + (b % c)) % c, (a * b) % c, ((a % c) * (b % c)) % c];
console.log(math.join('\n'));
