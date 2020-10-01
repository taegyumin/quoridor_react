import React from "react";
import { Pane, FullCircleIcon } from "evergreen-ui";
import { CellColor, Step, isEven } from "../Utils";

interface Props {
  position: { x: number; y: number };
  color: CellColor;
  width: number;
  height: number;
  isHover: boolean[][];
  move: (position: { x: number; y: number }) => void;
  hoverOver: (position: { x: number; y: number }) => void;
  leave: () => void;
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
  const { player0, player1, stepNumber } = step;
  const { background, hover } = isEven(stepNumber)
    ? color.player1
    : color.player0;

  const { x, y } = position;
  const on0 = player0.x === x && player0.y === y;
  const on1 = player1.x === x && player1.y === y;
  const onState = on0 || on1;

  const hoverState = isHover[x][y];

  return (
    <Pane
      key={x ** 2 + y}
      alignItems="center"
      justifyContent="center"
      background={background}
      width={width}
      height={height}
      onClick={() => {
        move(position);
      }}
      onMouseOver={() => {
        hoverOver(position);
      }}
      onMouseLeave={() => {
        leave();
      }}
    >
      <FullCircleIcon
        color={
          onState
            ? on0 === true
              ? color.player0.click
              : color.player1.click
            : hoverState
            ? hover
            : background
        }
        size={width}
      ></FullCircleIcon>
    </Pane>
  );
};

export default Cell;
