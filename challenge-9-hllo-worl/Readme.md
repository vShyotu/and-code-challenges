# Challenge 9 - Hllo Worl

## Instructions for running

1. Download the file - dictionary from the challenge is included in the repo (dictionary.txt) file - source: http://norvig.com/ngrams/enable1.txt
1. Run `node index.js`

## A note on timings

I've wrapped sections in console.time to measure timings. The app preprocesses the dictionary when its loaded to sort it by descending order of size then by alphabetical for same length words.

- The findLongestWord function on its own took approximately ~20-40ms when I ran this.
- Including the preprocessing of the dictionary, this increases the time to ~270ms on the first run and ~190ms afterwards.

```
λ node index.js
Input: hewsda
Found words: [ 'deadheaded', 'hasheeshes' ]
Find Longest Word: 39.373ms
App: 273.301ms

λ node index.js
Available keys: hewsda
Found words: [ 'deadheaded', 'hasheeshes' ]
Find Longest Word: 27.807ms
App: 189.952ms
```
