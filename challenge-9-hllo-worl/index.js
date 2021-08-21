console.time("App");
const fs = require("fs");
const inputString = "hewsda";

// Load and Pre-process the dictionary (so that it's alphabetical w/ descending size)
const textFile = fs.readFileSync("dictionary.txt", "utf-8");
const dictArray = textFile.split("\n");
let sortedDict = dictArray.sort(
  (a, b) => b.length - a.length || a.localeCompare(b)
);

// Checks if the given word can be made of the available keys array
const checkWord = (word, availableKeys) => {
  for (let j = 0; j < word.length; j++) {
    if (!availableKeys.includes(word[j])) {
      return false;
    }
  }

  return true;
};

// Finds the longest words given a string of available keys and a sorted dictionary (alphabetical w/ descending size)
const findLongestWords = (availableKeyString, sortedDictionary) => {
  const availableKeys = availableKeyString.split("");
  const foundWords = [];
  let longestWordLength = 0;

  for (let i = 0; i < sortedDictionary.length; i++) {
    const currentWord = sortedDictionary[i];

    if (foundWords.length > 1 && currentWord.length < longestWordLength) {
      break;
    }

    if (!checkWord(currentWord, availableKeys)) {
      continue;
    }

    foundWords.push(currentWord);
    longestWordLength = currentWord.length;
  }

  return foundWords;
};

console.time("Find Longest Word");
console.log(`Available keys: ${inputString}`);
console.log("Found words:", findLongestWords("hewsda", sortedDict));
console.timeEnd("Find Longest Word");
console.timeEnd("App");
