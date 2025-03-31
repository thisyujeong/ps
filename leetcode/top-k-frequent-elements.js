/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const arr = new Map();

  nums.forEach((n) => {
    if (arr.has(n)) arr.set(n, arr.get(n) + 1);
    else arr.set(n, 1);
  });

  const count = [...arr].sort((a, b) => b[1] - a[1]);
  const answer = count.slice(0, k).map((n) => n[0]);

  return answer;
};
