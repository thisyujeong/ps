/**
 * 1
 * 2 3 4 5 6 7 => 6
 * 8 9 10 11 12 13 14 15 16 17 18 19 => 12 (+6) => 방 1개
 * 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 => 18 (+6) => 방 2개
 * 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 => 24 (_6) => 방 3개
 */
const input = +require('fs').readFileSync('./input.txt').toString().trim();
let count = 1;
let range = 1;

while (range < input) {
  range += 6 * count;
  count++;
}
console.log(count);
