// Load inputs
const fs = require('fs');
const elementSymbolLookup = require('./elementSymbolLookup.json');
const inputs = fs.readFileSync('input.txt', 'utf-8').split('\n');
const dash = '-';

const subscriptsToDigit = (char) => {
  const result = "₀₁₂₃₄₅₆₇₈₉".indexOf(char);
  if (result > -1) return result;
  else { return char; }
}

const convertSubscriptsToDigits = (formula) => formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, subscriptsToDigit);

const isNumber = (char) => /\d/.test(char);

// Multiplies the values of all keys by a factor
const multiplyAllCounts = (countsObj, factor) => {
  const newObj = { ...countsObj };
  for (let key in newObj) {
    newObj[key] *= factor;
  }

  return newObj;
}

// Combines all of the objects into one, adds the values with the same key
const addsertObjects = (objectArray) => {
  const result = {};

  objectArray.forEach(obj => {
    if (!obj) return;
    for (let [key, value] of Object.entries(obj)) { 
      if (result[key]) { 
        result[key] += value; 
      } else { 
        result[key] = value;
      }
    }
  });

  return result;
}

const parseFormula = (formula) => {
  let output = {};
  let currentElement = '';
  let currentQuantity = '';

  const addCurrentElementToOutput = () => {
    if (currentElement !== '') {
      const parsedQuantity = parseInt(currentQuantity, 10) || 1;
      if (currentElement in output) {
        output[currentElement] += parsedQuantity;
      } else {
        output[currentElement] = parsedQuantity;
      }
    }
  }

  // Iterate through the string
  for (let i = 0; i < formula.length; i++) {
    // Starting a new sub-formula
    if (formula[i] === '(') {
      addCurrentElementToOutput();
      currentElement = '';
      currentQuantity = '';

      let bracketCounter = 0;

      // Scan ahead for the rest of the sub-formula
      for(let j = i; j < formula.length; j++) {
        // Find the bracket pair
        if (formula[j] === '(') bracketCounter++;
        if (formula[j] === ')') bracketCounter--;

        // If we get bracket counter 0 we've found a pair of brackets 
        if (bracketCounter === 0) {
          // Recurse on the subformula
          const innerFormula = formula.substring(i+1, j);
          const parsedBrackets = parseFormula(innerFormula);

          // Find any numbers attached to the brackets.
          let bracketMultiplier = '';
          let nextElementIndex = j+1;

          while(nextElementIndex < formula.length && isNumber(formula[nextElementIndex])) {
            bracketMultiplier += formula[nextElementIndex];
            nextElementIndex++;
          }

          // Multiply by the bracket multiplier, if any
          const parsedQuantity = parseInt(bracketMultiplier, 10) || 1;
          const multipliedBrackets = multiplyAllCounts(parsedBrackets, parsedQuantity);
          
          // Combine with the current output
          output = addsertObjects([output, multipliedBrackets]);

          i = nextElementIndex - 1;
          break;
        }
      }
    } else if (isNumber(formula[i])) { // Number means we're continuing the current element but increasing the quantity
      currentQuantity += formula[i];
    } else if (formula[i] === formula[i].toUpperCase()) { // Uppercase letter means we're switching to a new element
      addCurrentElementToOutput(i);
      currentElement = formula[i];
      currentQuantity = '';
    } else if (formula[i] === formula[i].toLowerCase()) { // Lowercase letter means we're continuing the current element
      currentElement += formula[i];
    }
  }

  addCurrentElementToOutput();

  return output;
}

inputs.forEach((formula) => {
  console.log(formula, `\n${dash.repeat(formula.length)}`);

  const parsedFormula = parseFormula(convertSubscriptsToDigits(formula), 0);

  for(const [key, value] of Object.entries(parsedFormula)) {
    console.log(`${elementSymbolLookup[key]} (${key}): ${value}`);
  }

  console.log('\n');
})