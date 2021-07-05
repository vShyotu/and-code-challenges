# Challenge 6 - Clock Wise

## Instructions for use

1. Download the folder/clone the repo
1. From the (challenge) folder run: `npm i` and then `npm run start`

## Tests

Run `npm run test` - to run the test suite - uses jest
Run `npm run test:coverage` for the coverage report.

## Notes

Times are read from input.txt.

I used the `say` npm package for text to speech audio - I wrapped promises around say.speak to prevent all lines being read out at once. This is implemented in `sayLines.js` - this function can be used more generically to read any array of strings, one by one.
