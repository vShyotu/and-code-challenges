const { loadCoins, loadTransactions } = require('./loaders');
const { calculateMinimumChange } = require('./minimum');
const { calculateMaximumChange } = require('./maximum');

const coinTray = loadCoins();
const transactions = loadTransactions();

console.log('------------------\n');
transactions.forEach((transaction) => {
  console.log(
    `${
      transaction.text
    }\nOutput (Min):\n${calculateMinimumChange(
      transaction.amount,
      transaction.cash,
      coinTray
    )}\nOutput (Max):\n${calculateMaximumChange(
      transaction.amount,
      transaction.cash,
      coinTray
    )}\n------------------\n`
  );
});
