import React from "react";
import Cell from "./Cell";
import WallHorizontal from "./Wall/WallHorizontal";
import WallVertical from "./Wall/WallVertical";
import WallIntersect from "./Wall/WallIntersect";
import { Pane } from "evergreen-ui";
import { AppConfig, Step, isEven } from "../Utils";

interface Props {
  appConfig: AppConfig;
  step: Step;
  move: (position: { x: number; y: number }) => void;
  put: (position: { x: number; y: number }) => void;
  isHover: boolean[][];
  hoverOver: (position: { x: number; y: number }) => void;
  leave: () => void;
}

export const Board = ({
  appConfig,
  step,
  move,
  put,
  isHover,
  hoverOver,
  leave,
}: Props) => {
  const {
    boardHeight,
    boardWidth,
    boardColor,
    wallLonger,
    breadth,
  } = appConfig;

  const { cellColor, wallColor } = boardColor;
  const { stepNumber } = step;
  const is0Turn = isEven(stepNumber) ? false : true;

  return (
    <Pane>
      {new Array(boardHeight).fill(1).map((_, x) => {
        return (
          <Pane display="flex" key={x}>
            {new Array(boardWidth).fill(1).map((_, y) => {
              if (isEven(x) && isEven(y)) {
                return (
                  <Cell
                    key={x ** 2 + y}
                    position={{ x, y }}
                    color={cellColor}
                    width={wallLonger}
                    height={wallLonger}
                    isHover={isHover}
                    step={step}
                    hoverOver={hoverOver}
                    leave={leave}
                    move={move}
                  ></Cell>
                );
              } else if (!isEven(x) && isEven(y)) {
                return (
                  <WallHorizontal
                    key={x ** 2 + y}
                    position={{ x, y }}
                    color={is0Turn ? wallColor.player0 : wallColor.player1}
                    width={wallLonger}
                    height={breadth}
                    isClick={
                      step.walls.find((wall) => wall.x === x && wall.y === y)
                        ? true
                        : false
                    }
                    isHover={isHover[x][y]}
                    hoverOver={hoverOver}
                    leave={leave}
                    put={put}
                  ></WallHorizontal>
                );
              } else if (isEven(x) && !isEven(y)) {
                return (
                  <WallVertical
                    key={x ** 2 + y}
                    position={{ x, y }}
                    color={is0Turn ? wallColor.player0 : wallColor.player1}
                    width={breadth}
                    height={wallLonger}
                    isClick={
                      step.walls.find((wall) => wall.x === x && wall.y === y)
                        ? true
                        : false
                    }
                    isHover={isHover[x][y]}
                    hoverOver={hoverOver}
                    leave={leave}
                    put={put}
                  ></WallVertical>
                );
              } else {
                return (
                  <WallIntersect
                    key={x ** 2 + y}
                    color={is0Turn ? wallColor.player0 : wallColor.player1}
                    width={breadth}
                    height={breadth}
                    isClick={
                      step.walls.find((wall) => wall.x === x && wall.y === y)
                        ? true
                        : false
                    }
                    isHover={isHover[x][y]}
                  ></WallIntersect>
                );
              }
            })}
          </Pane>
        );
      })}
    </Pane>
  );
};

export default Board;
