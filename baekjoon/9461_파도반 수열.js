const fs = require('fs');
const [n, ...input] = fs.readFileSync('./input.txt').toString().split('\n').map(Number);

input.map((num) => {
  let dp = [0, 1, 1, 1, 2];
  for (let j = 5; j <= num; j++) {
    dp[j] = dp[j - 5] + dp[j - 1];
  }
  console.log(dp[num]);
});
