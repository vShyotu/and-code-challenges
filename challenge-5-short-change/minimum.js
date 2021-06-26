const calculateMinimumChange = (transaction, cashProvided, coinTray) => {
  const change = cashProvided - transaction;
  const { coins, limits, text } = coinTray;
  const maxCoinIndex = coins.findIndex(value => value > change);
  if(maxCoinIndex === -1) 
    maxCoinIndex = coins.length;
  const a = [...Array(maxCoinIndex)].map((x) => Array(change).fill(Infinity));
  for (let i = 0; i < maxCoinIndex; i++) {
    for (let j = 0; j <= change; j++) {
      if (j === 0) {
        a[i][j] = 0;
      } else if (coins[i] > j) {
        i === 0 ? (a[i][j] = Infinity) : (a[i][j] = a[i - 1][j]);
      } else if (j > coins[i] * limits[i]) {
        i === 0
          ? a[i][j] = Infinity
          : a[i][j] = Math.min(a[i-1][j], limits[i] + a[i - 1][j - coins[i] * limits[i]]);
      } else {
        i === 0
          ? a[i][j] = 1 + a[i][j - coins[i]]
          : a[i][j] = Math.min(1 + a[i][j - coins[i]], a[i - 1][j]);
      }
    }
  }
  if (a[maxCoinIndex - 1][change] === Infinity)
    return 'Cannot make change for this transaction';
  let x = change;
  let currentCoinIndex = maxCoinIndex - 1;
  let currentValue = a[currentCoinIndex][x];
  const out = [];
  while (x > 0) {
    if (currentCoinIndex !== 0 && a[currentCoinIndex - 1][x] === currentValue) {
      currentCoinIndex -= 1;
    } else {
      x -= coins[currentCoinIndex];
      currentValue = a[currentCoinIndex][x];
      out.push(currentCoinIndex);
    }
  }
  const counts = out.reduce((obj, item) => {
    obj[item] = (obj[item] || 0) + 1;
    return obj;
  }, {});
  let outstring = '';
  for (const [key, value] of Object.entries(counts)) {
    outstring += `${value} x ${text[parseInt(key, 10)]}\n`;
  }
  return `${out.length} Coins\n\n${outstring}`;
};

module.exports = { calculateMinimumChange };
