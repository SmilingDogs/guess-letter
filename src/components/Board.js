import React, { useState } from "react";
import Cell from "./Cell";

const Board = () => {
  const [cellValues, setCellValues] = useState(["X", "X", "X", "X", "X", "X", "X", "X", "X"]);
  const [gameOn, setGameOn] = useState(false);
  const [message, setMessage] = useState('');
  const [valueHidden, setValueHidden] = useState("");
  const [letter, setLetter] = useState("");
  const [targetLetterCount, setTargetLetterCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showTask, setShowTask] = useState(false);
  const cellContent = ["A", "B", "C"];
  
  const TOTAL_CELLS = 9;

  const populateBoard = (arr) => {
    let res = [];
    for (let i = 0; i < TOTAL_CELLS; i++) {
      res = [...res, chooseLetter(arr)];
    }
    return res;
  };

  const chooseLetter = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const countTargetLetters = (arr) => arr.filter(item => item === letter).length;

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
      setMessage('');
      setShowTask(false);
      setTargetLetterCount(0);
      setCellValues(["X", "X", "X", "X", "X", "X", "X", "X", "X"]);
      setGameOn(false);

    }, 5000)
    
  }
  
  const revealValue = (e) => {

    if (e.target.innerText === letter) {
      console.log(cellValues);
      setMessage("Very well! You have good memory!");

      setTargetLetterCount((prevCount) => prevCount + 1);
      console.log(targetLetterCount);

      e.target.className = 'cell';

      if (targetLetterCount + 1 === countTargetLetters(cellValues)) {
        setMessage("Fantastic! You have found all target letters!");
        setValueHidden("");
        endGame();
        
        return;
      }

    } else {
      setMessage('I\'m so sorry...this is wrong. Please try again');
      setValueHidden("");
      endGame();
      
      return;
    }
  }

  

  return (
    <div>
      
      {showTask && <h2>Memorize all letter {letter} locations. Than, click to open cells with it</h2>}
      
      <h3>Number of attempts: {attempts}</h3>
      <div className="board">
        <div>
          <Cell value={cellValues[0]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[1]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[2]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
        </div>
        <div>
          <Cell value={cellValues[3]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[4]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[5]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
        </div>
        <div>
          <Cell value={cellValues[6]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[7]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
          <Cell value={cellValues[8]} valueHidden={valueHidden} disabled={!gameOn} onClick={revealValue} />
        </div>
      </div>
      {attempts === 0 && <button onClick={startGame} disabled={gameOn}>Start Game</button>}
      {attempts > 0 && <button onClick={startGame} disabled={gameOn}>Re-Start Game</button>}
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default Board;
