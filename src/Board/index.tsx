import React from "react";
import Cell from "./Cell";
import WallHorizontal from "./Wall/WallHorizontal";
import WallVertical from "./Wall/WallVertical";
import WallIntersect from "./Wall/WallIntersect";

interface Props {
  height: number;
  width: number;
}

const Board = ({ height, width }: Props) => {
  const createTable = ({ height, width }: Props) => {
    let table = [];

    const tableWidth = 2 * width - 1;
    const tableHeight = 2 * height - 1;

    for (let x = 0; x < tableWidth; x++) {
      let column = [];
      for (let y = 0; y < tableHeight; y++) {
        if (x % 2 === 0 && y % 2 === 0) {
          column.push(Cell({ isPlayer1: false, isPlayer2: false }));
        } else if (x % 2 === 0 && !(y % 2 === 0)) {
          column.push(WallHorizontal());
        } else if (!(x % 2 === 0) && y % 2 === 0) {
          column.push(WallVertical());
        } else {
          column.push(WallIntersect());
        }
      }
      table.push(<tr>{column}</tr>);
    }
    return table;
  };

  return (
    <table>
      <tbody>{createTable({ height, width })}</tbody>
    </table>
  );
};

export default Board;
