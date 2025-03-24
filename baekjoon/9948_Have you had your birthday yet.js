const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const timestamp = new Date('2007 4 August').getTime();
let answer = '';

input.forEach((birth) => {
  const [date, month] = birth.split(' ');
  const nDate = new Date('2007 ' + birth);
  const nTimestamp = nDate.getTime();

  if (date == 0 && month === '#') return;

  // 2월 29일에 태어나 윤년이 아닌 경우 Unlucky)
  if (month === 'February' && date == 29) {
    answer += 'Unlucky';
  }
  // 8월 4일 이전에 태어나 2007년 생일을 맞이한 경우 YES
  else if (nTimestamp < timestamp) {
    answer += 'Yes';
  }
  // 8월 4일 이후에 태어나 2007년 생일을 맞이하지 않은 경우 NO
  else if (nTimestamp > timestamp) {
    answer += 'No';
  }
  // 8월 4일에 태어나 생일인 경우 Happy birthday
  else {
    answer += 'Happy birthday';
  }

  answer += '\n';
});

console.log(answer);
