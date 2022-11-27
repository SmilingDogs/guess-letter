import React, { useState } from "react";
import Cell from "./Cell";

const Board = () => {
  const [cellValue, setCellValue] = useState(["X", "X", "X", "X", "X", "X", "X", "X", "X" ]);
  // const [gameOn, setGameOn] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [valueHidden, setValueHidden] = useState("");
  const [letter, setLetter] = useState("");

  const cellContent = ["A", "B", "C"];

  const populateBoard = (arr) => {
    let res = [];
    for (let i = 0; i < 9; i++) {
      res = [...res, chooseLetter(arr)];
    }
    return res;
  };

  const chooseLetter = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const startGame = () => {
    setCellValue(populateBoard(cellContent));
    setShowTask(true);
    setLetter(chooseLetter(cellContent));

    setTimeout(() => {
      setValueHidden("value-hidden");
      setShowTask(false);
    }, 5000);
  };

  return (
    <div>
      {showTask && (
        <h2>Memorize all letter {letter} locations. You've got 5 seconds...</h2>
      )}
      <div className="board">
        <div>
          <Cell value={cellValue[0]} valueHidden={valueHidden} />
          <Cell value={cellValue[1]} valueHidden={valueHidden} />
          <Cell value={cellValue[2]} valueHidden={valueHidden} />
        </div>
        <div>
          <Cell value={cellValue[3]} valueHidden={valueHidden} />
          <Cell value={cellValue[4]} valueHidden={valueHidden} />
          <Cell value={cellValue[5]} valueHidden={valueHidden} />
        </div>
        <div>
          <Cell value={cellValue[6]} valueHidden={valueHidden} />
          <Cell value={cellValue[7]} valueHidden={valueHidden} />
          <Cell value={cellValue[8]} valueHidden={valueHidden} />
        </div>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Board;
