import React from "react";
import Cell from "./Cell";
import WallHorizontal from "./Wall/WallHorizontal";
import WallVertical from "./Wall/WallVertical";
import WallIntersect from "./Wall/WallIntersect";
import { Pane } from "evergreen-ui";
import { AppConfig, Step } from "../Utils";

interface Props {
  appConfig: AppConfig;
  step: Step;
  move: (position: { x: number; y: number }) => void;
  put: (position: { x: number; y: number }) => void;
  isHover: boolean[][];
  handleHoverOn: (position: { x: number; y: number }) => void;
  handleHoverOff: (position: { x: number; y: number }) => void;
}

const Board = ({
  appConfig,
  step,
  move,
  put,
  isHover,
  handleHoverOn,
  handleHoverOff,
}: Props) => {
  const {
    boardHeight,
    boardWidth,
    boardColor,
    wallLonger,
    breadth,
  } = appConfig;

  const { cellColor, wallColor } = boardColor;

  return (
    <Pane>
      {new Array(boardHeight).fill(1).map((_, x) => {
        return (
          <Pane display="flex">
            {new Array(boardWidth).fill(1).map((_, y) => {
              if (x % 2 === 0 && y % 2 === 0) {
                return (
                  <Cell
                    position={{ x: y, y: x }}
                    color={cellColor}
                    width={wallLonger}
                    height={wallLonger}
                    isHover={isHover}
                    move={move}
                    handleHoverOn={handleHoverOn}
                    handleHoverOff={handleHoverOff}
                    step={step}
                  ></Cell>
                );
              } else if (x % 2 !== 0 && y % 2 === 0) {
                return (
                  <WallHorizontal
                    position={{ x, y }}
                    color={wallColor}
                    width={wallLonger}
                    height={breadth}
                    isHover={isHover}
                    put={put}
                    handleHoverOn={handleHoverOn}
                    handleHoverOff={handleHoverOff}
                    step={step}
                  ></WallHorizontal>
                );
              } else if (x % 2 === 0 && y % 2 !== 0) {
                return (
                  <WallVertical
                    position={{ x, y }}
                    color={wallColor}
                    width={breadth}
                    height={wallLonger}
                    isHover={isHover}
                    put={put}
                    handleHoverOn={handleHoverOn}
                    handleHoverOff={handleHoverOff}
                    step={step}
                  ></WallVertical>
                );
              } else {
                return (
                  <WallIntersect
                    position={{ x, y }}
                    color={wallColor}
                    width={breadth}
                    height={breadth}
                    isHover={isHover}
                    step={step}
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
