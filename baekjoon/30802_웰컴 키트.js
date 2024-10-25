const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = input[0];
const sizes = input[1].split(' ').map((v) => +v); // 각 티셔츠 사이즈별 신청자 수 [S, M, L, XL, XXL, XXXL]
const [T, P] = input[2].split(' ').map((v) => +v); // 티셔츠 T장 묶음, 펜 P자루 묶음
let shirt = 0;

for (let i = 0; i < 6; i++) {
  shirt += Math.ceil(sizes[i] / T);
}

console.log(shirt);
console.log(Math.floor(N / P), N % P);
