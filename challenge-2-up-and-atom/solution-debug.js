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

const multiplyAllCounts = (obj, factor) => {
  const newObj = { ...obj };
  for (let key in newObj) {
    newObj[key] *= factor;
  }

  return newObj;
}

const mergeObjects = (objectArray) => {
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

const parseFormula = (formula, depth) => {
  const tab = '\t'
  console.log(depth === 0 ? '' : tab.repeat(depth), '[BEGIN PARSE] Parsing formula:', formula);
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

  for (let i = 0; i < formula.length; i++) {
    console.log('\t'.repeat(depth), `[INDEX ${i}]`, formula[i], '|', output, currentElement, currentQuantity);

    if (formula[i] === '(') {
      addCurrentElementToOutput();
      currentElement = '';
      currentQuantity = '';

      let bracketCounter = 0;

      for(let j = i; j < formula.length; j++) {
        if (formula[j] === '(') bracketCounter++;
        if (formula[j] === ')') bracketCounter--;

        if (bracketCounter === 0) {
          const innerFormula = formula.substring(i+1, j);
          console.log(tab.repeat(depth+1), "[RECURSE]", innerFormula);

          const parsedBrackets = parseFormula(innerFormula, depth + 1);
          let bracketMultiplier = '';
          let nextElementIndex = j+1;

          while(nextElementIndex < formula.length && isNumber(formula[nextElementIndex])) {
            bracketMultiplier += formula[nextElementIndex];
            nextElementIndex++;
          }

          const parsedQuantity = parseInt(bracketMultiplier, 10) || 1;
          const multipliedBrackets = multiplyAllCounts(parsedBrackets, parsedQuantity);
          
          output = mergeObjects([output, multipliedBrackets]);

          i = nextElementIndex - 1;
          break;
        }
      }
    } else if (isNumber(formula[i])) {
      currentQuantity += formula[i];
    } else if (formula[i] === formula[i].toUpperCase()) {
      addCurrentElementToOutput(i);
      currentElement = formula[i];
      currentQuantity = '';
    } else if (formula[i] === formula[i].toLowerCase()) {
      currentElement += formula[i];
    }
  }
  
  addCurrentElementToOutput();
  console.log('\t'.repeat(depth), "[END PARSE]", output);
  return output;
}

inputs.forEach((formula) => {
  console.log(formula, `\n${dash.repeat(formula.length)}`)
  const parsedFormulae = parseFormula(convertSubscriptsToDigits(formula), 0);
  console.log(`${dash.repeat(formula.length)}`);

  for(const [key, value] of Object.entries(parsedFormulae)) {
    console.log(`${elementSymbolLookup[key]} (${key}): ${value}`);
  }

  console.log('\n');
})