const fs = require("fs");

const file = fs.readFileSync("data.csv", "utf-8");
const lines = file.split("\n");

const headers = lines[0]
  .split(",")
  .map((header) =>
    header.toLowerCase().replace(/\s+(.)/g, (_, g) => g.toUpperCase())
  );

const data = lines.slice(1).map((line) =>
  line.split(",").reduce(
    (acc, value, index) => ({
      ...acc,
      [headers[index]]: value,
    }),
    {}
  )
);

const yearsWithMostAlivePresidents = (data) => {
  let tally = {};
  let result = 0;
  data.forEach((item) => {
    let currentYear = new Date(item.birthDate).getFullYear();
    const deathYear = item.deathDate
      ? new Date(item.deathDate).getFullYear()
      : new Date().getFullYear();
    while (currentYear <= deathYear) {
      tally[currentYear] ? tally[currentYear]++ : (tally[currentYear] = 1);
      result = tally[currentYear] > result ? tally[currentYear] : result;
      currentYear++;
    }
  });
  const years = Object.keys(tally).filter((year) => tally[year] === result);
  console.log(
    `${result} future, active or former presidents were alive in:\n`,
    JSON.stringify(years)
  );
};

yearsWithMostAlivePresidents(data);
