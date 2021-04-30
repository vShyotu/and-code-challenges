// Parse the file input
const fileInput = require('fs').readFileSync('input.txt', 'utf-8').split('\n');
const input = fileInput.map(el => JSON.parse(el));

const calculateLightTime = (intervals) => {
  // Sort by lower bound
  intervals.sort(([a0], [b0]) => a0 - b0);
  
  let currentInterval = intervals[0];
  return intervals.reduce((result, nextInterval) => {
      // Disjoint, add the size of the new interval
      if (nextInterval[0] > currentInterval[1]) { 
        currentInterval = nextInterval;
      } else { // The intervals intersect, deduct the old total incase we add again.
        result -= currentInterval[1] - currentInterval[0];
        currentInterval = [currentInterval[0], Math.max(currentInterval[1], nextInterval[1])];
      }
      result += currentInterval[1] - currentInterval[0];
    return result;
  }, currentInterval[1] - currentInterval[0]);
}	

// Count the size all of the interval unions
console.log(calculateLightTime(input));