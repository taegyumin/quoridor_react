import React from "react";

interface isPlayer {
  isPlayer1: boolean;
  isPlayer2: boolean;
}

const Cell = ({ isPlayer1, isPlayer2 }: isPlayer) => {
  let inner;
  if (isPlayer1 || isPlayer2) {
    const player = isPlayer1 ? "1" : "2";
    inner = <div className={`cellFill player player${player}`} />;
  } else {
    inner = <div className="cellFill" />;
  }
  return <td className="cell">{inner}</td>;
};

export default Cell;
