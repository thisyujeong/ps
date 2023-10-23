const input = require('fs').readFileSync('./input.txt').toString().split(' ');
const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const date = new Date(`2007-${input[0]}-${input[1]}`);
console.log(day[date.getDay()]);
