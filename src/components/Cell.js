import React from "react";

const Cell = ({ value, onClick, disabled, isHidden }) => {
  return (
    <button
      className={`cell ${isHidden ? "value-hidden" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Cell;
