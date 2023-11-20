let input = +require('fs').readFileSync('./input.txt').toString().trim();
const answer = [];

if (input === 0) {
  console.log(0);
} else {
  while (input / -2 !== 0) {
    let remainder = input % 2;

    if (remainder === 1 || remainder === -1) {
      input = Math.floor(input / -2) + 1;
      answer.push(1);
    } else if (remainder === 0) {
      input = Math.floor(input / -2);
      answer.push(0);
    }
  }
}

console.log(answer.length === 0 ? 0 : answer.reverse().join(''));
