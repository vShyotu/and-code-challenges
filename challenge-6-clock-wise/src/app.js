const fs = require("fs");

const { timeToSpokenFormat } = require("./timeToSpokenFormat");
const { sayLines } = require("./sayLines");

const app = async () => {
  const input = fs.readFileSync("input.txt", "utf-8");
  const lines = [];

  console.log("\nText Output: ");
  input.split("\n").forEach((time) => {
    const formattedTime = timeToSpokenFormat(time);
    console.log(formattedTime);
    lines.push(formattedTime);
  });

  console.log("\nAudio Output: ");

  await sayLines(lines);
};

module.exports = app;
