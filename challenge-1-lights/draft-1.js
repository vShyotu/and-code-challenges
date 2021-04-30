// Read input.txt and put it into an array.
const fileInput = require('fs').readFileSync('input.txt', 'utf-8').split('\n');
const input = fileInput.map(el => JSON.parse(el));

// Checks if two intervals intersect
const intersects = (interval1, interval2) =>
  (interval1[0] <= interval2[0] && interval2[0] <= interval1[1]) ||
  (interval1[0] <= interval2[1] && interval2[1] <= interval1[1]);

// Assumes interval1's lower bound is less than interval2's (due to sorted order)
const expandIntervalUpperBound = (interval1, interval2) =>
  interval2[1] > interval1[1]
    ? [interval1[0], interval2[1]]
    : [interval1[0], interval1[1]];

// Calculates the set of the unions of all intervals in the given array.
const calculateIntervalUnion = (intervals) => {
  // Sort by lower bound
  intervals.sort(([a0], [b0]) => a0 - b0);

  const outputIntervals = [intervals[0]];

  intervals.forEach((interval) => {
    // If intersects, expand the upper bound
    if (intersects(outputIntervals[outputIntervals.length - 1], interval)) {
      const last = outputIntervals.pop();
      outputIntervals.push(expandIntervalUpperBound(last, interval));
    } else { // Disjoint, add it to the output.
      outputIntervals.push(interval);
    }
  });

  return outputIntervals;
};

// Calculates the sum of all intervals and prints the result.
const output = calculateIntervalUnion(input).reduce(
    (prev, current) => prev + current[1] - current[0],
    0
  )

console.log(output);
