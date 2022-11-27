import React from "react";

const Cell = ({ value, valueHidden }) => {
  return <button className={`cell ${valueHidden}`}>{value}</button>;
};

export default Cell;
