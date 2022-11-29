import React from "react";

const Cell = ({ value, valueHidden, onClick, disabled }) => {
  return <button className={`cell ${valueHidden}`} onClick={onClick} disabled={disabled}>{value}</button>;
};

export default Cell;
