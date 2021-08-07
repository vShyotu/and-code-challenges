const numeralLookup = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };

const parseRomanNumeral = (numeral) => {
  let total = 0;
  let chainSum = numeralLookup[numeral[0]];
  let chainSubtractions = 0;

  for (let i = 0; i < numeral.length; i++) {
    const current = numeralLookup[numeral[i]];

    if (i + 1 < numeral.length) {
      const next = numeralLookup[numeral[i + 1]];

      if (current > next) {
        total += chainSum - chainSubtractions;
        chainSubtractions = 0;
        chainSum = next;
      } else if (current === next) {
        chainSum += current;
      } else {
        chainSubtractions += chainSum;
        chainSum = next;
      }
    } else {
      total += chainSum - chainSubtractions;
    }
  }

  return total;
};

const compare = (left, right) => {
  const parsedLeft = parseRomanNumeral(left);
  const parsedRight = parseRomanNumeral(right);
  return parsedLeft < parsedRight;
};

let args = [];
if (process.argv.length > 2 && process.argv.length <= 4) {
  args = process.argv.slice(2);
} else {
  args = ["VI", "MMMCXI"];
}

console.log(
  `Comparing: ${args[0]} (${parseRomanNumeral(args[0])}) and ${
    args[1]
  } (${parseRomanNumeral(args[1])}) - ${compare(args[0], args[1])}`
);
