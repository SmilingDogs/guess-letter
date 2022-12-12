import React, { useState } from "react";
import Cell from "./Cell";

const defaultGameMatrix = [
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

const DEFAULT_DELAY = 3000;

const cellContent = ["A", "B", "C"];
const TOTAL_CELLS = defaultGameMatrix.length;

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

const GAME_STATUS = {
  NotStarted: "not-started",
  Revealed: "revealed",
  Guessing: "guessing",
  Lost: "lost",
  Won: "won",
};

const Board = () => {
  const [cellValues, setCellValues] = useState(defaultGameMatrix);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NotStarted);
  const [letter, setLetter] = useState("");
  const [targetLetterCount, setTargetLetterCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [guessed, showGuessed] = useState(false);

  const startGame = () => {
    setGameStatus(GAME_STATUS.Revealed);
    setCellValues(populateBoard(cellContent));
    setLetter(chooseLetter(cellContent));

    setTimeout(() => {
      setGameStatus(GAME_STATUS.Guessing);
    }, DEFAULT_DELAY);
  };

  const endGame = () => {
    setTimeout(() => {
      setAttempts((prevNumber) => prevNumber + 1);
      setTargetLetterCount(0);
      setCellValues(defaultGameMatrix);
      setGameStatus(GAME_STATUS.NotStarted);
    }, DEFAULT_DELAY);
  };

  const revealValue = (e) => {
    if (e.target.innerText !== letter) {
      setGameStatus(GAME_STATUS.Lost);
      showGuessed(false);
      endGame();
      return;
    }
    showGuessed(true);
    setTimeout(() => {
      showGuessed(false);
    }, 1000);
    setTargetLetterCount((prevCount) => prevCount + 1);

    e.target.className = "cell";

    if (targetLetterCount + 1 === countTargetLetters(cellValues, letter)
    ) {
      setGameStatus(GAME_STATUS.Won);
      endGame();
    }
  };

  const isStartButtonEnabled =
    gameStatus === GAME_STATUS.NotStarted;

  const isGuessingAllowed =
    gameStatus === GAME_STATUS.Guessing;

  const isTaskHidden =
    gameStatus === GAME_STATUS.NotStarted;

  const isValueVisible =
    gameStatus === GAME_STATUS.Revealed ||
    gameStatus === GAME_STATUS.Won ||
    gameStatus === GAME_STATUS.Lost;

  const isWonMessageVisible =
    gameStatus === GAME_STATUS.Won;
  const isLostMessageVisible =
    gameStatus === GAME_STATUS.Lost;

  return (
    <div>
      {isTaskHidden ? null : (
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
              isHidden={!isValueVisible}
              disabled={!isGuessingAllowed}
              onClick={revealValue}
            />
          ))}
        </div>
      </div>
      <button
        onClick={startGame}
        disabled={!isStartButtonEnabled}
      >
        {attempts === 0 ? "Start Game" : "Re-Start Game"}
      </button>

      {isWonMessageVisible ? (
        <h2>Fantastic! You have found all target letters!</h2>
      ) : null}
      {guessed ? (
        <h2>Very well! You have good memory.</h2>
      ) : null}

      {isLostMessageVisible ? (
        <h2>Sorry...this is incorrect. Try next time!</h2>
      ) : null}
    </div>
  );
};

export default Board;
