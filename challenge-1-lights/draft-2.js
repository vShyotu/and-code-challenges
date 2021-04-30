// Parse the file input
const fileInput = require('fs').readFileSync('input.txt', 'utf-8').split('\n');
const input = fileInput.map(el => JSON.parse(el));

const calculateIntervalUnions = (intervals) => {
  // Sort by lower bound
  intervals.sort(([a0], [b0]) => a0 - b0);

  return intervals.reduce((result, currentInterval) => {
      // If currentInterval lower bound is greater than the upper bound of the last interval in the result, then they're disjoint, so add to the array.
      if (currentInterval[0] > result[result.length-1][1]) { 
        result.push(currentInterval);
      } else { // The intervals intersect, extend the upper bound to be the greater of the two upper bounds.
        const prev = result.pop();
        result.push([prev[0], Math.max(prev[1], currentInterval[1])]);
      }
    return result;
  }, [intervals[0]]);
}	

// Count the size all of the interval unions
const output = calculateIntervalUnions(input).reduce(
    (prev, current) => prev + current[1] - current[0],
    0
  )

console.log(output);
