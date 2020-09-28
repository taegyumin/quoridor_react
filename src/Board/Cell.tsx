import React from "react";
import { Pane, FullCircleIcon } from "evergreen-ui";
import { CellColor, Step } from "../Utils";

interface isPlayer {
  isPlayer1: boolean;
  isPlayer0: boolean;
}

interface Props {
  position: { x: number; y: number };
  color: CellColor;
  width: number;
  height: number;
  isHover: boolean[][];
  move: (position: { x: number; y: number }) => void;
  hoverOver: (position: { x: number; y: number }) => void;
  leave: (position: { x: number; y: number }) => void;
  step: Step;
}

const Cell = ({
  position,
  color,
  width,
  height,
  isHover,
  move,
  hoverOver,
  leave,
  step,
}: Props) => {
  /*
   * 필요한 것: position, move, color (defaultColor, onColor, hoverColor), cellSize, setOn(position), setHover(position)
   *
   */
  const { defaultColor, player0Color, player1Color } = color;
  const { x, y } = position;

  const { player0, player1 } = step;

  const on0 = player0.x === x && player0.y === y;
  const on1 = player1.x === x && player1.y === y;

  const onState = on0 || on1;

  const hoverState = isHover[x][y];

  return (
    <Pane
      key={x}
      background={defaultColor}
      float="left"
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        move(position);
      }}
      onMouseOver={() => {
        hoverOver(position);
      }}
      onMouseLeave={() => {
        leave(position);
      }}
    >
      <FullCircleIcon
        color={
          onState
            ? on0 === true
              ? player0Color.click
              : player1Color.click
            : hoverState
            ? on0 === true
              ? player0Color.hover
              : player1Color.hover
            : defaultColor
        }
        size={width}
      ></FullCircleIcon>
    </Pane>
  );
};

export default Cell;
