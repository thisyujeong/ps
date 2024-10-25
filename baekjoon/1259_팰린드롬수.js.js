const nums = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
let result = '';

function palindrome(num) {
  let isPalindrome = true;
  for (let i = 0; i < Math.floor(num.length / 2); i++) {
    if (num[i] !== num[num.length - 1 - i]) return false;
  }
  return isPalindrome;
}

for (let i = 0; i < nums.length - 1; i++) {
  result += palindrome(nums[i]) ? 'yes\n' : 'no\n';
}

console.log(result);
