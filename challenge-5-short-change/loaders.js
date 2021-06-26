// Code in this file is purely to parse the text files to feed to the algorithm
const fs = require('fs');

const inPence = (stringValue) => {
  if (stringValue.includes('£')) {
    return new Number(stringValue.replace('£', '')) * 100;
  } else if (stringValue.includes('p')) {
    return new Number(stringValue.replace('p', '')) * 1;
  } else {
    return new Number(stringValue);
  }
};

const loadCoins = () => {
  const coinString = fs.readFileSync('coins.txt', 'utf-8');
  const out = { text: [], coins: [], limits: [] };
  coinString.split('\n').forEach((line) => {
    const lineValues = line.split(' x ');
    out.limits.unshift(parseInt(lineValues[0], 10));
    out.text.unshift(lineValues[1]);
    out.coins.unshift(inPence(lineValues[1]));
  });
  return out;
};

const loadTransactions = () => {
  const transactions = fs
    .readFileSync('transactions.txt', 'utf-8')
    .match(/Transaction: (.*?)\nCash Provided: (.*?)\n/g);
  return transactions.map((item) => {
    const lines = item.split('\n');
    return {
      text: item,
      amount: inPence(lines[0].replace('Transaction: ', '')),
      cash: inPence(lines[1].replace('Cash Provided: ', '')),
    };
  });
};

module.exports = { loadCoins, loadTransactions };
