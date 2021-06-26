# Challenge 5 - Short Change

## Instructions for running
1. Download/clone the folder/repo
1. Run `node index.js` from the folder

## Notes
* I used a dynamic programming approach to solve this - algorithm isn't super readable but makes more sense performing it on paper.
* `loaders.js` parses the text files (coins.txt and transactions.txt) into a format that getMaximumCoins and getMinimumCoins can use
* `index.js` iterates through the parsed transactions and outputs to the console.
* `minimum.js` and `maximum.js` contain the actual algorithms that calculate the max/min number of coins needed (**Note:** they're both under 50 lines but if you wanna include the parsing/loading and iteration over the transactions as part of the line count then I'll take the 2 point hit)

## Inputs
* `transactions.txt` - contains the list of transacations and cash provided, you can add more problems just keep the format consistent!
* `coins.txt` - contains the list of coins available, need to keep the formatting consistent (and don't mix £ & p on the same line) otherwise it will break!

## Sample output
```
------------------

Transaction: £8.85
Cash Provided: £10

Output (Min):
5 Coins

1 x 5p
1 x 10p
2 x 50p

Output (Max):
19 Coins

5 x 1p
5 x 2p
4 x 5p
6 x 10p
1 x 20p

------------------
```