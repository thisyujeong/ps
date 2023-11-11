const fs = require('fs');
const s = fs.readFileSync('./input.txt').toString().trim().split('');
const result = [];

// ASCII Code
// a: 97 ~ z: 122
for (let i = 97; i <= 122; i++) {
  result.push(s.indexOf(String.fromCharCode(i)));
}

console.log(result.join(' '));
