import React from "react";

interface Props {
  numOfWallLeft: number;
  playerNumber: number;
}

const WallLeftIndicator = ({ numOfWallLeft, playerNumber }: Props) => {
  let row = [];
  for (let i = 0; i < numOfWallLeft; i++) {
    const className = "wallIndicator player" + playerNumber;
    row.push(
      <td key={i} className={className}>
        {" "}
      </td>
    );
  }
  return (
    <table>
      <tbody>
        <tr>{row}</tr>
      </tbody>
    </table>
  );
};

export default WallLeftIndicator;
