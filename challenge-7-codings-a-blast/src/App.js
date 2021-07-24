import "./App.css";
import { useState } from "react";

const rulePredicates = {
  white: (next) => next !== "white" && next !== "black",
  orange: (next) => next === "green",
  black: (next) => next !== "white" && next !== "green" && next !== "orange",
  red: (next) => next === "orange" || next === "black",
  green: (next) => next === "orange" || next === "white",
  purple: (next) =>
    next !== "purple" &&
    next !== "green" &&
    next !== "orange" &&
    next !== "white",
};

const testSequence = (sequence) => {
  let current = 0;
  while (current < sequence.length) {
    const [currentWire, nextWire] = sequence.slice(current, current + 2);
    if (!rulePredicates[currentWire](nextWire)) return false;
    current++;
  }
  return true;
};

const rules = `If you cut a white wire, you can't then immediately cut white or black wires.
If you cut an orange wire, you have to then immediately cut a green one.
If you cut a black wire, you aren't allowed to then immediately cut a white, green or orange one.
If you cut a red wire, you must then immediately cut an orange or black one.
If you cut a green wire, you must then immediately cut an orange or white one.
If you cut a purple wire, you can't then immediately cut a purple, green, orange or white one.`;

const startingSequences = [
  ["green", "white", "red", "black"],
  ["red", "green", "purple", "white"],
  ["white", "green", "black", "orange"],
  ["purple", "red", "orange", "green"],
  ["green", "black", "white", "orange"],
];

const SequenceDisplay = ({ sequence }) => {
  if (!sequence) {
    return null;
  }
  return (
    <ul className="input-list">
      {sequence &&
        sequence.map((wire, idx) => (
          <li
            key={`${wire}-${idx}`}
            className={`input-list__item input-list__item--${wire}`}
          >
            {wire[0]}
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [inputSequence, setInputSequence] = useState([]);
  const [testedSequences, setTestedSequences] = useState(() =>
    startingSequences.map((sequence) => ({
      sequence,
      result: testSequence(sequence) ? "defused" : "boom",
    }))
  );

  const onTestClicked = () => {
    setTestedSequences((prev) => {
      const next = [
        {
          sequence: inputSequence,
          result: testSequence(inputSequence) ? "defused" : "boom",
        },
        ...prev,
      ];
      if (next.length > 6) {
        next.pop();
      }
      return next;
    });
    setInputSequence([]);
  };

  return (
    <div className="App">
      <h1>Challenge 7 - Coding's a blast</h1>
      <h2>Rules</h2>
      <code>{rules}</code>
      <h2>Input</h2>
      <div className="container" style={{ display: "flex", flexFlow: "wrap" }}>
        {["white", "orange", "black", "red", "green", "purple"].map((wire) => (
          <button
            key={wire}
            onClick={() => setInputSequence((prev) => [...prev, wire])}
            className={`btn btn--${wire}`}
          >
            {wire}
          </button>
        ))}
      </div>
      <h2>Sequence</h2>
      <div className="container">
        <SequenceDisplay sequence={inputSequence} />
        <button
          disabled={!(inputSequence && inputSequence.length > 0)}
          className="btn btn--primary"
          onClick={onTestClicked}
        >
          Enter
        </button>
      </div>

      <h2>Result</h2>
      <div className="container">
        {testedSequences && testedSequences.length > 0 && (
          <>
            <SequenceDisplay sequence={testedSequences[0].sequence} />
            <span className={`result result--${testedSequences[0].result}`}>
              {testedSequences[0].result}
            </span>
          </>
        )}
      </div>
      <h2>Previous Attempts</h2>
      <div className="previous-container">
        <ul className="previous-list">
          {testedSequences &&
            testedSequences.map(({ sequence, result }, idx) =>
              idx !== 0 ? (
                <li key={`${sequence}-${idx}`}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SequenceDisplay sequence={sequence} />
                    <span className={`result result--${result}`}>{result}</span>
                  </div>
                </li>
              ) : null
            )}
        </ul>
      </div>
    </div>
  );
};

export default App;
