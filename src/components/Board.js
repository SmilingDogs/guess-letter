import React, { useState } from "react";
import Cell from "./Cell";

const defualtGameMatrix = [
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
];

const cellContent = ["A", "B", "C"];
const TOTAL_CELLS = defualtGameMatrix.length;

const chooseLetter = (arr) => {
  const randomIndex = Math.floor(
    Math.random() * arr.length
  );
  return arr[randomIndex];
};

const populateBoard = (arr) => {
  const res = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    res.push(chooseLetter(arr));
  }
  return res;
};

const countTargetLetters = (arr, letter) =>
  arr.filter((item) => item === letter).length;

const Board = () => {
  const [cellValues, setCellValues] = useState(
    defualtGameMatrix
  );
  const [gameOn, setGameOn] = useState(false);
  const [message, setMessage] = useState("");
  const [valueHidden, setValueHidden] = useState("");
  const [letter, setLetter] = useState("");
  const [targetLetterCount, setTargetLetterCount] =
    useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showTask, setShowTask] = useState(false);

  const startGame = () => {
    setGameOn(true);
    setShowTask(true);
    setCellValues(populateBoard(cellContent));
    setLetter(chooseLetter(cellContent));

    setTimeout(() => {
      setValueHidden("value-hidden");
    }, 5000);
  };

  const endGame = () => {
    setTimeout(() => {
      setAttempts((prevNumber) => prevNumber + 1);
      setMessage("");
      setShowTask(false);
      setTargetLetterCount(0);
      setCellValues(defualtGameMatrix);
      setGameOn(false);
    }, 5000);
  };

  const revealValue = (e) => {
    if (e.target.innerText !== letter) {
      setMessage(
        "I'm so sorry...this is wrong. Please try again"
      );
      setValueHidden("");
      endGame();
      return;
    }

    setMessage("Very well! You have good memory!");
    setTargetLetterCount((prevCount) => prevCount + 1);

    e.target.className = "cell";

    if (
      targetLetterCount + 1 ===
      countTargetLetters(cellValues, letter)
    ) {
      setMessage(
        "Fantastic! You have found all target letters!"
      );
      setValueHidden("");
      endGame();
    }
  };

  return (
    <div>
      {showTask && (
        <h2>
          Memorize all letter {letter} locations. Than,
          click to open cells with it
        </h2>
      )}

      <h3>Number of attempts: {attempts}</h3>
      <div className="board">
        <div>
          {cellValues.map((cellValue, i) => (
            <Cell
              key={i}
              value={cellValue}
              valueHidden={valueHidden}
              disabled={!gameOn}
              onClick={revealValue}
            />
          ))}
        </div>
      </div>
      <button onClick={startGame} disabled={gameOn}>
        {attempts === 0 ? "Start Game" : "  Re-Start Game"}
      </button>
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default Board;
