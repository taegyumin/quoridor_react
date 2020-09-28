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
      {new Array(boardHeight).fill(1).map((_, index1) => {
        return (
          <Pane display="flex">
            {new Array(boardWidth).fill(1).map((_, index2) => {
              if (index1 % 2 === 0 && index2 % 2 === 0) {
                return (
                  <Cell
                    key={index2}
                    position={{ x: index2, y: index1 }}
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
              } else if (index1 % 2 !== 0 && index2 % 2 === 0) {
                return (
                  <WallHorizontal
                    position={{ x: index1, y: index2 }}
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
              } else if (index1 % 2 === 0 && index2 % 2 !== 0) {
                return (
                  <WallVertical
                    position={{ x: index1, y: index2 }}
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
                    position={{ x: index1, y: index2 }}
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
